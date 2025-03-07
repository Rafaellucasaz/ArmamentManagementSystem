module ApplicationHelper
  def show_errors(object, attribute)
    if object.errors[attribute].any?
      content_tag(:div, object.errors[attribute].join(", "), class: "error-message")
    end
  end
end
