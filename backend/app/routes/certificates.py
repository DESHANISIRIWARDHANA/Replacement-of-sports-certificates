from flask import Blueprint, jsonify, request
from app.utils.decorators import token_required
from app.services.certificates import CertificateService
# In certificates.py and auth.py
from app.services.firebase import FirebaseService

cert_bp = Blueprint('certificates', __name__)


# Create request (must match OPTIONS endpoint)
@cert_bp.route('/request', methods=['POST'])
@token_required(roles=['athlete', 'admin'])
def create_request(current_user):
    try:
        return CertificateService.create_request(current_user)
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
#Add valid certificate to DB
@cert_bp.route('/certificate/valid', methods=['POST'])
@token_required(roles=['admin'])
def add_valid_certificate(current_user):
    return CertificateService.add_valid_certificate()

#Get all valid certificates
@cert_bp.route('/certificate/valid', methods=['GET'])
@token_required(roles=['admin'])
def get_valid_certificates(current_user):
    return CertificateService.get_valid_certificates()

#get valid ertificate using query
@cert_bp.route('/certificate/valid/query', methods=['GET'])
@token_required(roles=['admin'])
def get_valid_certificates_by_query(current_user):
    nic = request.args.get('nic')
    birthCertNumber = request.args.get('birthCertNumber')
    return CertificateService.get_valid_certificates_by_query(nic, birthCertNumber)

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
@cert_bp.route('/request/<request_id>', methods=['GET'])
@token_required(roles=['admin','athlete'])
def get_request(current_user, request_id):
    return CertificateService.get_request(request_id)

#get specific user requests
@cert_bp.route('/request/verify/<request_id>', methods=['GET'])
@token_required(roles=['admin','athlete'])
def get_verified_request(current_user, request_id):
    return CertificateService.get_verified_request(request_id)

#Delete specific user requests
@cert_bp.route('/request/<request_id>', methods=['DELETE'])
@token_required(roles=['admin'])
def delete_request(current_user, request_id):
    return CertificateService.delete_request(request_id)


#Get specific user certificates
@cert_bp.route('/certificates', methods=['GET'])
@token_required(roles=['athlete', 'admin'])
def get_certificates(current_user):
    return CertificateService.get_certificates(current_user)

#Delete Released certificate
@cert_bp.route('/certificate/<certificate_id>', methods=['DELETE'])
@token_required(roles=['athlete', 'admin'])
def delete_certificate(current_user, certificate_id):
    return CertificateService.delete_certificate(certificate_id)

#Delete Valid certitifacte details
@cert_bp.route('/certificate/valid/<certificate_id>', methods=['DELETE'])
@token_required(roles=['admin'])
def delete_valid_certificate(current_user, certificate_id):
    return CertificateService.delete_valid_certificate(certificate_id)


