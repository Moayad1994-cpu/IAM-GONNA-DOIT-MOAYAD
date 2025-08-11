
import os
import json
import requests
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Initialize Flask app
app = Flask(__name__, static_folder='.', template_folder='.')
CORS(app)  # Enable CORS for all routes

# Configuration
GEMINI_API_KEY = "AIzaSyAqjgFK0yUHUu8yo2qtxmPFjTyf2PLDJRk"  # تأكد أن تضع API KEY الصحيح هنا أو من الواجهة الأمامية
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

# Company information
COMPANY_INFO = {
    "name_en": "I Am Gonna Do It",
    "name_ar": "انا استطيع فعل اي شي",
    "location": "Abu Dhabi, Yas Island",
    "email": "moayaddughmosh@gmail.com",
    "phone": "+971545489973",
    "instagram": "https://www.instagram.com/moayad_dughmosh/",
    "tiktok": "https://www.tiktok.com/@moayad99940?lang=en",
    "coffee_payment": "https://coff.ee/moayad_dughmosh"
}

# خدمات الموقع
SERVICES = [
    {
        "id": "website-design",
        "name_en": "Website Design",
        "name_ar": "تصميم المواقع",
        "description_en": "Professional responsive websites with modern design and optimal user experience",
        "description_ar": "مواقع إلكترونية احترافية متجاوبة مع تصميم حديث وتجربة مستخدم مثلى",
        "price": 299
    },
    # ... (أضف باقي الخدمات كما في الكود الأصلي)
]

service_requests = []
chat_history = []

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/api/services')
def get_services():
    return jsonify({
        "success": True,
        "services": SERVICES
    })

@app.route('/api/company-info')
def get_company_info():
    return jsonify({
        "success": True,
        "company": COMPANY_INFO
    })

@app.route('/api/service-request', methods=['POST'])
def submit_service_request():
    try:
        data = request.get_json()
        required_fields = ['fullName', 'email', 'phone', 'serviceId', 'projectDescription']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    "success": False,
                    "error": f"Missing required field: {field}"
                }), 400
        
        service = next((s for s in SERVICES if s['id'] == data['serviceId']), None)
        if not service:
            return jsonify({
                "success": False,
                "error": "Invalid service ID"
            }), 400
        
        custom_amount = data.get('customAmount')
        final_price = float(custom_amount) if custom_amount else service['price']

        service_request = {
            "id": len(service_requests) + 1,
            "timestamp": datetime.now().isoformat(),
            "client": {
                "name": data['fullName'],
                "email": data['email'],
                "phone": data['phone'],
                "company": data.get('company', '')
            },
            "service": {
                "id": service['id'],
                "name_en": service['name_en'],
                "name_ar": service['name_ar'],
                "base_price": service['price'],
                "final_price": final_price
            },
            "project": {
                "description": data['projectDescription'],
                "timeline": data.get('timeline', ''),
                "custom_amount": custom_amount
            },
            "status": "pending"
        }
        service_requests.append(service_request)
        return jsonify({
            "success": True,
            "message": "Service request submitted successfully",
            "request_id": service_request['id'],
            "final_price": final_price
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/chat', methods=['POST'])
def chat_with_ai():
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        language = data.get('language', 'en')
        api_key = data.get('api_key', GEMINI_API_KEY)
        
        if not message:
            return jsonify({
                "success": False,
                "error": "Message is required"
            }), 400
        
        if not api_key:
            return jsonify({
                "success": False,
                "error": "API key is required"
            }), 400
        
        if language == 'ar':
            system_prompt = f"""أنت مساعد ذكي لشركة "{COMPANY_INFO['name_ar']}" الموجودة في {COMPANY_INFO['location']}. ..."""
        else:
            system_prompt = f"""You are an AI assistant for "{COMPANY_INFO['name_en']}" company located in {COMPANY_INFO['location']}. ..."""

        headers = {
            'Content-Type': 'application/json',
        }
        payload = {
            "contents": [{
                "parts": [{
                    "text": f"{system_prompt}\n\nUser: {message}"
                }]
            }]
        }
        response = requests.post(
            f"{GEMINI_API_URL}?key={api_key}",
            headers=headers,
            json=payload,
            timeout=30
        )
        if response.status_code != 200:
            return jsonify({
                "success": False,
                "error": "Failed to get response from AI service"
            }), 500
        
        response_data = response.json()
        if 'candidates' not in response_data or not response_data['candidates']:
            return jsonify({
                "success": False,
                "error": "No response from AI service"
            }), 500
        
        ai_response = response_data['candidates'][0]['content']['parts'][0]['text']
        chat_entry = {
            "timestamp": datetime.now().isoformat(),
            "user_message": message,
            "ai_response": ai_response,
            "language": language
        }
        chat_history.append(chat_entry)
        return jsonify({
            "success": True,
            "response": ai_response
        })
    except requests.exceptions.Timeout:
        return jsonify({
            "success": False,
            "error": "Request timeout. Please try again."
        }), 500
    except requests.exceptions.RequestException as e:
        return jsonify({
            "success": False,
            "error": "Network error. Please check your connection."
        }), 500
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/payment/coffee', methods=['POST'])
def process_coffee_payment():
    try:
        data = request.get_json()
        amount = data.get('amount', 0)
        if amount <= 0:
            return jsonify({
                "success": False,
                "error": "Invalid amount"
            }), 400
        payment_url = f"{COMPANY_INFO['coffee_payment']}?amount={amount}"
        return jsonify({
            "success": True,
            "payment_url": payment_url,
            "message": "Redirecting to Coffee payment..."
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/send-email', methods=['POST'])
def send_to_email():
    try:
        data = request.get_json()
        sender_email = "adelmoayad93@gmail.com"
        sender_password = ""
        receiver_email = "hakemmmoayad38@gmail.com"
        subject = "طلب خدمة جديد من الموقع"
        html_content = f"""
        <b>اسم العميل:</b> {data.get('name', '')}<br>
        <b>البريد:</b> {data.get('email', '')}<br>
        <b>الجوال:</b> {data.get('phone', '')}<br>
        <b>الخدمة/الطلب:</b> {data.get('service', '')}<br>
        <b>الوصف/تفاصيل:</b><br>{data.get('description', '')}<br>
        """

        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = subject
        message.attach(MIMEText(html_content, "html"))

        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        server.quit()
        return jsonify({"success": True, "message": "Email sent"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/stats')
def get_stats():
    return jsonify({
        "success": True,
        "stats": {
            "total_requests": len(service_requests),
            "total_chats": len(chat_history),
            "services_count": len(SERVICES),
            "last_updated": datetime.now().isoformat()
        }
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        "success": True,
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": "Endpoint not found"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Flask server on port {port}...")
    print(f"Website will be available at: http://localhost:{port}")
    print(f"API endpoints available at: http://localhost:{port}/api/")
    app.run(
        host='0.0.0.0',
        port=port,
        debug=True,
        threaded=True
    )
