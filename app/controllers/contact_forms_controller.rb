class ContactFormsController < ApplicationController
  def new
    @contact = ContactForm.new
  end

  def create
    @contact = ContactForm.new(contact_form_params)
    @contact.request = request
    if @contact.deliver
      flash.now[:notice] = "Thank you for your message. We will contact you soon!"
      redirect_to root_path
    else
      flash.now[:error] = "Cannot send message."
      render :new
    end
  end

  private

  def contact_form_params
   params.require(:contact_form).permit(:name, :email, :message, :nickname)
 end
end
