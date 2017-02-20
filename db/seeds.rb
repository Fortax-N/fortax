	# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if AdminUser.count == 0
Company.create!(id: 1, about_us: "We are a Canadian based company who provide Income tax return services. We know that tax season is not always an easy time, and this is why we are here to assist you. Our mission is to provide Multi-lingual services you can trust at a reasonable cost.\nWe believe in helping our society, and want to make a difference, and this is why we are going to choose a charitable foundation worthy of helping. After all, you allow us to provide you the service you deserve, and we assist you with your tax return and together we can all help those in need.\nWe believe in Faith, Hope, and Charity and this is the reason why we want to help charitable foundations reach their goal of assisting others in need. The more Income tax return we prepare, the more financial help we will be able to provide to those in need.", address_line_1: "2 St. Clair Ave. West", address_line_2: "Floor 18", city: "Toronto", state: "Ontario", country: "Canada", postal_code: "M4V 1L5", phone_number: "+1 416-220-6428", email: "Info@Fortax.ca", office_hours: "Monday-Friday : \n9 AM - 6 PM \nSaturday : \nBy appointment \nSunday : \nBy appointment") if Company.count == 0

Form.destroy_all

Form.create([
	{name: "Basic tax return", price: 49.99},
	{name: "T3", price: 5},
	{name: "T4", price: 4, included_forms: 2},
	{name: "T4A", price: 4},
	{name: "T4A(OAS)", price: 4},
	{name: "T4A P", price: 4},
	{name: "T4E", price: 4},
	{name: "T4RIF", price: 4},
	{name: "T4RSP", price: 4},
	{name: "T5", price: 5},
	{name: "T5007", price: 4},
	{name: "T5008", price: 8},
	{name: "RC62", price: 5},
	{name: "RC210", price: 5},
	{name: "StudentT2202", price: -(49.99*0.2), included_forms: 0},
	{name: "Child care expenses", price: 10.00},
	{name: "RRSP contribution", price: 4.00, included_forms: 2},
	{name: "Medical expenses", price: 2.00, included_forms: 2},
	{name: "Donations", price: 3.00, included_forms: 1},
	{name: "Disability", price: 20.00, included_forms: 1},
	{name: "First time home buyer", price: 20.00, included_forms: 0},
	{name: "Moving expenses", price: 25.00, included_forms: 0},
]) if Form.count == 0

LandingPageVariable.destroy_all

LandingPageVariable.create([
	{name: "Income Tax Return", amount: "$49.99", unit: "per file"},
	{name: "Student Tax Return", amount: "$29.99", unit: "per file"},
])

Setting.create(email: "info@fortax.ca") if Setting.count == 0