from . import views
from django.urls import path


urlpatterns = [

    path('', views.index, name='index'),
    path('upload/', views.upload_file, name='upload_file'),
    path('query/', views.query, name='query'),
]
