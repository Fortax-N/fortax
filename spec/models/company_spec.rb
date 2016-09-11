require 'rails_helper'

RSpec.describe Company, type: :model do
  it {should validate_presence_of :email}
  it {should validate_presence_of :phone_number}
  
  describe "phone number" do
	context "format is +1 222-222-2222" do
	  it "is valid" do
	    company = FactoryGirl.build(:company)
		expect(company).to be_valid	
	  end
	end

	context "format is +1 222 222 2222" do
	  it "is invalid" do
	    company = FactoryGirl.build(:company, phone_number: "+1 222 222 2222")
	    expect(company).to_not be_valid
	  end
	end

	context "format is +1 2222222222" do
	  it "is invalid" do
		company = FactoryGirl.build(:company, phone_number: "+1 2222222222")
	    expect(company).to_not be_valid
	  end
	end

	context "format is +12222222222" do
	  it "is invalid" do
		company = FactoryGirl.build(:company, phone_number: "+12222222222")
	    expect(company).to_not be_valid
	  end
	end

	context "format is 12222222222" do
	  it "is invalid" do
		company = FactoryGirl.build(:company, phone_number: "12222222222")
	    expect(company).to_not be_valid
	  end
	end
  end

  describe "email" do
  	context "format is john@example.com" do
  	  it "is valid" do
        company = FactoryGirl.build(:company)
    	expect(company).to be_valid
  	  end
  	end

  	context "format is a plain text" do
  	  it "is invalid" do
	    company = FactoryGirl.build(:company, email: "this is a plain text")
		expect(company).to_not be_valid
  	  end
  	end

  	context "format does not contain @ symbol" do
  	  it "is invalid" do
	    company = FactoryGirl.build(:company, email: "no.proper.symbol")
		expect(company).to_not be_valid
	  end
  	end
  end
end