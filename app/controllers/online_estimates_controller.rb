class OnlineEstimatesController < ApplicationController
  layout "form_pages"
  def index

  end

  def create
    pdf = generate_pdf(params)
    
    files = {}        
    files["t220a"] = Upload.create(file: params["t220a_document"]).file if params["t220a_document"]
    files["spouse_t220a"] = Upload.create(file: params["spouse_t220a_document"]).file if params["spouse_t220a_document"]
    files["t_1013"] = Upload.create(file: params["t_1013"]).file if params["t_1013"]
    files["t_183"] = Upload.create(file: params["t_183"]).file if params["t_183"]    

    send_mail_to_user(form_params: params)
    send_mail_to_admin(form_params: params, pdf: pdf, files: files)

    flash[:success] = "Thank you! We have received your application and will reach out to you shortly."
    redirect_to root_path
  end


  private

  def generate_pdf(params)
    string = "<h3>Info Of Client</h3>"
    string += "<table>"

    
    params.each do |key, value|      
      next if value.class == ActionDispatch::Http::UploadedFile
      string += "<tr>"
      string += "<td><strong>#{key.humanize.titleize}:</strong></td>"
      string += "<td>#{value.empty? ? 'Empty' : value}</td>"
      string += "</tr>"
    end
    string += "</table>"

    WickedPdf.new.pdf_from_string(string)
  end

  def send_mail_to_user(form_params)
    NotifierMailer.mail_to_user(form_params).deliver
  end

  def send_mail_to_admin(form_params)
    NotifierMailer.mail_to_admin(form_params).deliver
  end

  def form_params
    params.require(:form_data)   
  end
end
