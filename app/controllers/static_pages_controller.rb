class StaticPagesController < ApplicationController
  def index
  	@company = Company.first
  end
end
