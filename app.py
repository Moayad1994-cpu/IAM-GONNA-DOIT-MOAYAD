 #!/usr/bin/env python3
"""
Flask Backend for "I Am Gonna Do It" Website
Serves static files and handles API requests including chatbot functionality
"""

import os
import json
import requests
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__, static_folder='.', template_folder='.')
CORS(app)  # Enable CORS for all routes

# Configuration
GEMINI_API_KEY = "AIzaSyC5i91OaNv30FkF6zjg976SD7HZ2GZOt0I"
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

# Services data
SERVICES = [
    {
        "id": "website-design",
        "name_en": "Website Design",
        "name_ar": "تصميم المواقع",
        "description_en": "Professional responsive websites with modern design and optimal user experience",
        "description_ar": "مواقع إلكترونية احترافية متجاوبة مع تصميم حديث وتجربة مستخدم مثلى",
        "price": 299
    },
    {
        "id": "app-development",
        "name_en": "Professional Application Development",
        "name_ar": "تطوير التطبيقات الاحترافية",
        "description_en": "Custom mobile and web applications built with cutting-edge technology",
        "description_ar": "تطبيقات جوال وويب مخصصة مبنية بأحدث التقنيات",
        "price": 599
    },
    {
        "id": "cv-creation",
        "name_en": "Professional CV Creation (ATS System)",
        "name_ar": "إنشاء السيرة الذاتية الاحترافية (نظام ATS)",
        "description_en": "ATS-optimized resumes that pass automated screening systems",
        "description_ar": "سير ذاتية محسنة لأنظمة ATS تجتاز أنظمة الفحص الآلي",
        "price": 49
    },
    {
        "id": "graphic-design",
        "name_en": "Graphic Design, Logo Creation, Advertising and Poster Design",
        "name_ar": "التصميم الجرافيكي وإنشاء الشعارات والإعلانات والملصقات",
        "description_en": "Creative visual designs for branding, marketing, and promotional materials",
        "description_ar": "تصاميم بصرية إبداعية للعلامة التجارية والتسويق والمواد الترويجية",
        "price": 149
    },
    {
        "id": "ui-ux-design",
        "name_en": "Website Interface Design",
        "name_ar": "تصميم واجهات المواقع",
        "description_en": "User-centered interface design for optimal user experience",
        "description_ar": "تصميم واجهات محورها المستخدم لتجربة مستخدم مثلى",
        "price": 199
    },
    {
        "id": "engineering-drawing",
        "name_en": "Engineering Drawing",
        "name_ar": "الرسم الهندسي",
        "description_en": "Technical drawings and blueprints for engineering projects",
        "description_ar": "رسومات تقنية ومخططات للمشاريع الهندسية",
        "price": 179
    },
    {
        "id": "ai-models",
        "name_en": "AI Models and Systems",
        "name_ar": "نماذج وأنظمة الذكاء الاصطناعي",
        "description_en": "Custom AI solutions and machine learning models for your business",
        "description_ar": "حلول ذكاء اصطناعي مخصصة ونماذج تعلم آلي لأعمالك",
        "price": 799
    },
    {
        "id": "video-production",
        "name_en": "Advertising Videos and Project Filming",
        "name_ar": "فيديوهات إعلانية وتصوير المشاريع",
        "description_en": "Professional video production for marketing and promotional content",
        "description_ar": "إنتاج فيديو احترافي للتسويق والمحتوى الترويجي",
        "price": 399
    },
    {
        "id": "presentation-creation",
        "name_en": "Professional Presentation Creation",
        "name_ar": "إنشاء العروض التقديمية الاحترافية",
        "description_en": "Engaging presentations that captivate your audience",
        "description_ar": "عروض تقديمية جذابة تأسر جمهورك",
        "price": 99
    },
    {
        "id": "ai-automation",
        "name_en": "AI Agent Automation",
        "name_ar": "أتمتة وكلاء الذكاء الاصطناعي",
        "description_en": "Intelligent automation solutions to streamline your business processes",
        "description_ar": "حلول أتمتة ذكية لتبسيط عمليات أعمالك",
        "price": 699
    },
    {
        "id": "brochure-design",
        "name_en": "Brochure Design",
        "name_ar": "تصميم البروشورات",
        "description_en": "Professional brochures that effectively communicate your message",
        "description_ar": "بروشورات احترافية تنقل رسالتك بفعالية",
        "price": 79
    },
    {
        "id": "marketing-social-media",
        "name_en": "Marketing and Social Media",
        "name_ar": "التسويق ووسائل التواصل الاجتماعي",
        "description_en": "Comprehensive digital marketing strategies and social media management",
        "description_ar": "استراتيجيات تسويق رقمي شاملة وإدارة وسائل التواصل الاجتماعي",
        "price": 249
    },
    {
        "id": "podcast-recording",
        "name_en": "Podcast Recording",
        "name_ar": "تسجيل البودكاست",
        "description_en": "Professional podcast recording and production services",
        "description_ar": "خدمات تسجيل وإنتاج البودكاست الاحترافية",
        "price": 199
    },
    {
        "id": "studio-photography",
        "name_en": "Studio Photography",
        "name_ar": "التصوير الاستوديو",
        "description_en": "High-quality studio photography for portraits and products",
        "description_ar": "تصوير استوديو عالي الجودة للصور الشخصية والمنتجات",
        "price": 149
    },
    {
        "id": "product-photography",
        "name_en": "Product Photography",
        "name_ar": "تصوير المنتجات",
        "description_en": "Professional product photography for e-commerce and marketing",
        "description_ar": "تصوير منتجات احترافي للتجارة الإلكترونية والتسويق",
        "price": 129
    },
    {
        "id": "video-filming",
        "name_en": "Video Filming for Projects, Seminars, and Graduations",
        "name_ar": "تصوير فيديو للمشاريع والندوات والتخرج",
        "description_en": "Professional event videography for special occasions",
        "description_ar": "تصوير فيديو احترافي للفعاليات والمناسبات الخاصة",
        "price": 299
    },
    {
        "id": "ai-task-completion",
        "name_en": "AI Task Completion",
        "name_ar": "إنجاز المهام بالذكاء الاصطناعي",
        "description_en": "Automated task completion using advanced AI technologies",
        "description_ar": "إنجاز المهام الآلي باستخدام تقنيات الذكاء الاصطناعي المتقدمة",
        "price": 199
    }
]

# In-memory storage for demo purposes (use a database in production)
service_requests = []
chat_history = []

@app.route('/')
def index():
    """Serve the main website"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('.', filename)

@app.route('/api/services')
def get_services():
    """Get all available services"""
    return jsonify({
        "success": True,
        "services": SERVICES
    })

@app.route('/api/company-info')
def get_company_info():
    """Get company information"""
    return jsonify({
        "success": True,
        "company": COMPANY_INFO
    })

@app.route('/api/service-request', methods=['POST'])
def submit_service_request():
    """Handle service request submission"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['fullName', 'email', 'phone', 'serviceId', 'projectDescription']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    "success": False,
                    "error": f"Missing required field: {field}"
                }), 400
        
        # Find the selected service
        service = next((s for s in SERVICES if s['id'] == data['serviceId']), None)
        if not service:
            return jsonify({
                "success": False,
                "error": "Invalid service ID"
            }), 400
        
        # Calculate final price
        custom_amount = data.get('customAmount')
        final_price = float(custom_amount) if custom_amount else service['price']
        
        # Create service request
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
        
        # Store the request
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
    """Handle AI chat requests"""
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
        
        # Create system prompt based on language
        if language == 'ar':
            system_prompt = f"""أنت مساعد ذكي لشركة "{COMPANY_INFO['name_ar']}" الموجودة في {COMPANY_INFO['location']}. 
            
نحن نقدم خدمات رقمية متنوعة:
- تصميم المواقع ($299)
- تطوير التطبيقات ($599) 
- السيرة الذاتية ($49)
- التصميم الجرافيكي ($149)
- تصميم واجهات المواقع ($199)
- الرسم الهندسي ($179)
- أنظمة الذكاء الاصطناعي ($799)
- إنتاج الفيديو ($399)
- العروض التقديمية ($99)
- أتمتة الذكاء الاصطناعي ($699)
- تصميم البروشورات ($79)
- التسويق ووسائل التواصل ($249)
- تسجيل البودكاست ($199)
- التصوير الاستوديو ($149)
- تصوير المنتجات ($129)
- تصوير الفعاليات ($299)
- إنجاز المهام بالذكاء الاصطناعي ($199)

يمكن للعملاء الدفع عبر:
- Coffee: {COMPANY_INFO['coffee_payment']}
- Apple Pay
- بطاقات الائتمان

للتواصل:
- البريد الإلكتروني: {COMPANY_INFO['email']}
- الهاتف: {COMPANY_INFO['phone']}
- إنستغرام: {COMPANY_INFO['instagram']}
- تيك توك: {COMPANY_INFO['tiktok']}

أجب بالعربية بطريقة مفيدة ومهنية."""
        else:
            system_prompt = f"""You are an AI assistant for "{COMPANY_INFO['name_en']}" company located in {COMPANY_INFO['location']}.

We offer various digital services:
- Website Design ($299)
- App Development ($599)
- CV Creation ($49)
- Graphic Design ($149)
- UI/UX Design ($199)
- Engineering Drawing ($179)
- AI Models and Systems ($799)
- Video Production ($399)
- Presentation Creation ($99)
- AI Agent Automation ($699)
- Brochure Design ($79)
- Marketing and Social Media ($249)
- Podcast Recording ($199)
- Studio Photography ($149)
- Product Photography ($129)
- Event Video Filming ($299)
- AI Task Completion ($199)

Customers can pay via:
- Coffee: {COMPANY_INFO['coffee_payment']}
- Apple Pay
- Credit cards

Contact information:
- Email: {COMPANY_INFO['email']}
- Phone: {COMPANY_INFO['phone']}
- Instagram: {COMPANY_INFO['instagram']}
- TikTok: {COMPANY_INFO['tiktok']}

Respond helpfully and professionally in English."""
        
        # Call Gemini API
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
        
        # Store chat history
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
    """Generate Coffee payment link"""
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

@app.route('/api/stats')
def get_stats():
    """Get website statistics"""
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
    """Health check endpoint"""
    return jsonify({
        "success": True,
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    })

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        "success": False,
        "error": "Endpoint not found"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Run the Flask app
    print(f"Starting Flask server on port {port}...")
    print(f"Website will be available at: http://localhost:{port}")
    print(f"API endpoints available at: http://localhost:{port}/api/")
    
    app.run(
        host='0.0.0.0',  # Allow external connections
        port=port,
        debug=True,  # Enable debug mode for development
        threaded=True  # Enable threading for better performance
    )