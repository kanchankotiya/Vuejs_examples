class EventsController < ApplicationController
  def index
    load_events
  end

  def create
    build_event

    if @event.save
      render status: :created
    else
      render json: { errors: @event.errors }, status: :unprocessable_entity
    end 
  end

  def update
    load_event
    build_event

    if @event.save
      render status: :created
    else
      render json: { errors: @event.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    load_event
    @event.destroy

    render status: :ok
  end

private

  def event_scope
    Event.all
  end

  def load_events
    @events = event_scope.order(event_date: :DESC)
  end

  def load_event
    @event ||= event_scope.find(params[:id])
  end

  def build_event
    @event ||= event_scope.build
    @event.attributes = event_params
  end

  def event_params
    @event_params = params[:event]
    @event_params ? @event_params.permit(permitted_params) : {}
  end

  def permitted_params
    %i[
      event_type
      event_date
      title
      speaker
      host
      published
    ]
  end

end
