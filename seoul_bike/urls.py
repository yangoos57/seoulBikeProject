from django.contrib import admin
from django.urls import path
from django.urls import path, include
from rest_framework import routers
from dashboard import views
from django.views.generic import TemplateView


class HomeTemplateView(TemplateView):
    template_name = "index.html"


router = routers.DefaultRouter()
router.register(
    "stationInformation", views.stationInformationView, "stationInformation"
)
router.register("selector_Options", views.selector_OptionsView, "selector_Options")

urlpatterns = [
    path("", HomeTemplateView.as_view(), name="home"),
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/testing", views.plots.as_view()),
]
# path('stationinfo/', views.stationToDB)  # bike_station 정보


from django.conf import settings

if settings.DEBUG:
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
