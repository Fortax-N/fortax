class OnlineEstimate < ActiveRecord::Base
  STATUSES = ["Single","Common Law Spouse","Married","Widowed","Separated","Divorced"]
	
  GENDER = ["Male","Female","Other"]  
end