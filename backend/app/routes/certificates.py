from flask import Blueprint
from app.utils.decorators import token_required
from app.services.certificates import CertificateService
# In certificates.py and auth.py
from app.services.firebase import FirebaseService

cert_bp = Blueprint('certificates', __name__)

# # Handle CORS preflight requests properly
# @cert_bp.route('/request', methods=['OPTIONS'])
# def handle_options():
#     response = make_response(jsonify({"message": "Preflight OK"}), 200)
#     response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
#     response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
#     response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
#     response.headers['Access-Control-Allow-Credentials'] = 'true'
#     return response

# Create request (must match OPTIONS endpoint)
@cert_bp.route('/request', methods=['POST'])
@token_required(roles=['athlete', 'admin'])
def create_request(current_user):
    return CertificateService.create_request(current_user)

#Get status of the request
@cert_bp.route('/status', methods=['GET'])
@token_required(roles=['athlete'])
def get_status(current_user):
    return CertificateService.get_status(current_user)

#Download certificate
@cert_bp.route('/download/<request_id>', methods=['GET'])
@token_required(roles=['athlete'])
def download_certificate(current_user, request_id):
    return CertificateService.download_certificate(current_user, request_id)

#get specific user requests
@cert_bp.route('/request/<request_id>', methods=['DELETE'])
@token_required(roles=['athlete'])
def delete_request(current_user, request_id):
    return CertificateService.delete_request(current_user, request_id)


#Get specific user certificates
@cert_bp.route('/certificates', methods=['GET'])
@token_required(roles=['athlete'])
def get_certificates(current_user):
    return CertificateService.get_certificates(current_user)


