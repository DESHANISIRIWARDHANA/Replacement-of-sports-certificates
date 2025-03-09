import os
from flask import request
from app.services.firebase import FirebaseService
from app.utils.email_service import EmailService
from app.utils.exceptions import CertificateError
from datetime import datetime
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from app.utils.certificate_generator import generate_certificate

# Get the directory of the current file
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the font file
font_path = os.path.join(current_dir, '../services/templates/YoungSerif-Regular.ttf')

# Register the "Young Serif" font
pdfmetrics.registerFont(TTFont('YoungSerif', font_path))

class CertificateService:
#Request for certificate replacement
    @staticmethod
    def create_request(user):
        try:
            # Print incoming form data and files for debugging
            print("Form Data:", request.form)
            print("Uploaded Files:", request.files)

            data = request.form
            files = request.files

            # Upload supporting documents if provided
            old_doc_url = None
            if 'oldDocumentCopy' in files and files['oldDocumentCopy'].filename:
                old_doc_url = FirebaseService.upload_file(
                    files['oldDocumentCopy'],
                    f"requests/{user['uid']}/{datetime.now().isoformat()}_{files['oldDocumentCopy'].filename}"
                )

            nic_url = FirebaseService.upload_file(
                files['NIC'],
                f"requests/{user['uid']}/{datetime.now().isoformat()}_{files['NIC'].filename}"
            )

            # Create request record
            request_data = {
                'user_id': user['uid'],
                'status': 'pending',
                'old_document_url': old_doc_url,
                'nic_url': nic_url,
                'created_at': datetime.now().isoformat(),
                'full_name': data.get('fullName'),
                'faculty_name': data.get('facultyName'),
                'student_id': data.get('studentId'),
                'dob': data.get('dob'),
                'address': data.get('address'),
                'email': data.get('email'),
                'phone_number': data.get('phoneNumber'),
                'event_name': data.get('eventName'),
                'certificate_type': data.get('certificateType'),
                'date_issued': data.get('dateIssued'),
                'reason': data.get('reason'),
                'meet': data.get('meet'),
                'ageGroup': data.get('ageGroup'),
                'nic': data.get('nic'),
                'place': data.get('place'),
                'birthCertNumber': data.get('birthCertNumber'),
                "certificate_id": data.get('certificate_id', None),  # Optional
                "prediction": data.get('prediction'),
                'matchingPercentage': data.get('matchingPercentage')
            }

            # Add the request to the database and get the request_id
            doc_ref = FirebaseService.db.collection('certificate_requests').add(request_data)
            request_id = doc_ref[1].id

            # Update the request data with the request_id
            request_data['request_id'] = request_id
            FirebaseService.db.collection('certificate_requests').document(request_id).set(request_data)

            return {'message': 'Request submitted successfully', 'request_id': request_id}, 201

        except Exception as e:
            print("Error in create_request:", str(e))  # Debugging
            raise CertificateError(str(e))

#Add valid certificate to DB
    @staticmethod
    def add_valid_certificate():
        try:
            data = request.get_json()
            print("Received data:", data)  # Add logging to check received data

            certificate_data = {
                'certificate_id': data['certificate_id'],
                'nic': data['nic'],
                'name': data['name'],
                'meet': data['meet'],
                'ageGroup': data['ageGroup'],
                'place': data['place'],
                'birthCertNumber': data['birthCertNumber'],
                'issuedDate': data['issuedDate'],
                'created_at': datetime.now().isoformat()
            }

            print("Certificate data to be added:", certificate_data)  # Add logging to check certificate data

            doc_ref = FirebaseService.db.collection('valid_certificates').add(certificate_data)
            certificate_id_db = doc_ref[1].id

            FirebaseService.db.collection('valid_certificates').document(certificate_id_db).update({'certificate_id_db': certificate_id_db})
            

            print("Certificate added successfully with ID:", certificate_id_db)  # Add logging to confirm addition

            return {'message': 'Certificate added successfully', 'certificate_id_db': certificate_id_db}, 201
        except Exception as e:
            print("Error:", str(e))  # Add logging to capture any errors
            raise CertificateError(str(e))
        
#Get valid certificates for admin
    @staticmethod
    def get_valid_certificates():
        try:
            docs = FirebaseService.db.collection('valid_certificates').stream()
            return {'certificates': [doc.to_dict() for doc in docs]}, 200
        except Exception as e:
            raise CertificateError(str(e))
        

#get specifi valid certificate deails from nic or birth certificate number
    @staticmethod
    def get_valid_certificates_by_query(nic=None, birthCertNumber=None):
        try:
            query = FirebaseService.db.collection('valid_certificates')
            
            if nic:
                query = query.where('nic', '==', nic)
            elif birthCertNumber:
                query = query.where('birthCertNumber', '==', birthCertNumber)
            
            docs = query.stream()
            return {'certificates': [doc.to_dict() for doc in docs]}, 200
        except Exception as e:
            raise CertificateError(str(e))
        
#Get status of the request for users not admin
    @staticmethod
    def get_status(user):
        try:
            requests = FirebaseService.get_user_requests(user['uid'])
            return {'requests': requests}, 200
        except Exception as e:
            raise CertificateError(str(e))


# Add to CertificateService class
    @staticmethod
    def get_all_pending_requests():
        try:
            docs = FirebaseService.db.collection('certificate_requests').where('status', '==', 'pending').stream()
            return {'requests': [doc.to_dict() for doc in docs]}, 200
        except Exception as e:
            raise CertificateError(str(e))
        
#Get all requests for admin
    @staticmethod
    def get_all_requests():
        try:
            docs = FirebaseService.db.collection('certificate_requests').stream()
            return {'requests': [doc.to_dict() for doc in docs]}, 200
        except Exception as e:
            raise CertificateError(str(e))
        
#Get specific request for admin
    @staticmethod
    def get_request(request_id):
        try:
            request_data = FirebaseService.db.collection('certificate_requests').document(request_id).get().to_dict()
            return {'request': request_data}, 200
        except Exception as e:
            raise CertificateError(str(e))
        
#get specific request for users verification
    @staticmethod
    def get_verified_request(request_id):
        try:
            doc_ref = FirebaseService.db.collection('certificate_requests').document(request_id)
            request_data = doc_ref.get().to_dict()
            if request_data:
                return {'requestDetails': request_data}, 200
            else:
                return {'message': 'Request not found'}, 404
        except Exception as e:
            raise CertificateError(str(e))

#Approve request for admin
    @staticmethod
    def approve_request(request_id):
        try:
            doc_ref = FirebaseService.db.collection('certificate_requests').document(request_id)
            doc_ref.update({'status': 'approved'})

            # Get request data
            request_data = doc_ref.get().to_dict()

            # Generate certificate PDF
            certificate_path = generate_certificate(request_data)

            # Upload certificate PDF
            with open(certificate_path, 'rb') as certificate_file:
                certificate_url = FirebaseService.upload_file(
                    certificate_file,
                    f"certificates/{request_id}_certificate.pdf"
                )

            # Update with certificate URL
            doc_ref.update({'certificate_url': certificate_url})

            # Save the certificate URL to the database
            FirebaseService.db.collection('certificates').document(request_id).set({
                'certificate_url': certificate_url,
                'user_id': request_data['user_id'],
                'created_at': datetime.now().isoformat(),
                'event_name': request_data['event_name'],
                'date_issued': request_data['date_issued'],
                'full_name': request_data['full_name'],
                'reason': request_data['reason'],
                'request_id': request_data['request_id'],
                'certificate_id': request_id
            })

            # Send the certificate link via email
            user_email = request_data['email']
            EmailService.send_certificate_email(user_email, certificate_url)


            return {'message': 'Request approved successfully'}, 200
        except Exception as e:
            raise CertificateError(str(e))

#Reject request for admin
    @staticmethod
    def reject_request(request_id):
        try:
            doc_ref = FirebaseService.db.collection('certificate_requests').document(request_id)
            doc_ref.update({'status': 'rejected'})
            return {'message': 'Request rejected successfully'}, 200
        except Exception as e:
            raise CertificateError(str(e))

#Download certificate for users
    @staticmethod
    def download_certificate(user, request_id):
        try:
            # Check if the user has access to the certificate
            certificate = FirebaseService.db.collection('certificates').document(request_id).get().to_dict()
            if certificate['user_id'] != user['uid']:
                raise CertificateError('You do not have permission to access this certificate')

            # Get the certificate URL
            certificate_url = certificate['certificate_url']
            return {'certificate_url': certificate_url}, 200
        except Exception as e:
            raise CertificateError(str(e))

#Delete request for users

    @staticmethod
    def delete_request(request_id):
        try:
            print(f"Attempting to delete request {request_id}")
            # Delete the request
            FirebaseService.db.collection('certificate_requests').document(request_id).delete()
            print(f"Request {request_id} deleted successfully")
            return {'message': 'Request deleted successfully'}, 200
        except Exception as e:
            print(f"Error deleting request {request_id}: {str(e)}")
            raise CertificateError(str(e))

#get specific certificates for users
    @staticmethod
    def get_certificates(user):
        try:
            certificates = FirebaseService.get_user_certificates(user['uid'])
            return {'certificates': certificates}, 200
        except Exception as e:
            raise CertificateError(str(e))

#get specific certificate for admin
    @staticmethod
    def get_certificate(certificate_id):
        try:
            certificate = FirebaseService.db.collection('certificates').document(certificate_id).get().to_dict()
            return {'certificate': certificate}, 200
        except Exception as e:
            raise CertificateError(str(e))

#get all certificates for admin
    @staticmethod
    def get_all_certificates():
        try:
            docs = FirebaseService.db.collection('certificates').stream()
            return {'certificates': [doc.to_dict() for doc in docs]}, 200
        except Exception as e:
            raise CertificateError(str(e))
        
#Delete Released certificate
    @staticmethod
    def delete_certificate(certificate_id):
        try:
            print(f"Attempting to delete certificate {certificate_id}")
            # Delete the certificate
            FirebaseService.db.collection('certificates').document(certificate_id).delete()
            print(f"Certificate {certificate_id} deleted successfully")
            return {'message': 'Certificate deleted successfully'}, 200
        except Exception as e:
            print(f"Error deleting certificate {certificate_id}: {str(e)}")
            raise CertificateError(str(e))
        
#delete valid certificate for admin
    @staticmethod
    def delete_valid_certificate(certificate_id):
        try:
            print(f"Attempting to delete certificate {certificate_id}")
            # Delete the certificate
            FirebaseService.db.collection('valid_certificates').document(certificate_id).delete()
            print(f"Certificate {certificate_id} deleted successfully")
            return {'message': 'Certificate deleted successfully'}, 200
        except Exception as e:
            print(f"Error deleting certificate {certificate_id}: {str(e)}")
            raise CertificateError(str(e))

