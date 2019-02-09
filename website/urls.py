from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.homepage, name='homepage'),
    url(r'^enquiry_form/$', views.enquiry_form, name='enquiry_form'),
]









