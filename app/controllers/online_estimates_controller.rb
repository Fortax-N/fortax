class OnlineEstimatesController < ApplicationController
  layout "form_pages"
  def index

  end

  def create
    pdf = generate_pdf(params)

    send_mail_to_user(form_params: params)
    send_mail_to_admin(form_params: params, pdf: pdf)

    flash[:success] = "Thank you! We have received your application and will reach out to you shortly."
    redirect_to root_path
  end


  private

  def generate_pdf(params)
    string = "<h3>Info Of Client</h3>"
    string += "<table>"
    params.each do |key, value|
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
