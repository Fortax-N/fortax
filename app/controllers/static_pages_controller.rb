class StaticPagesController < ApplicationController
  def index
  	@company = Company.find(1)
  end
end
