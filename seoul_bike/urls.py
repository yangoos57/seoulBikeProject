from django.contrib import admin
from django.urls import path, re_path, include
from backend import views as functions
from django.views.generic import TemplateView


class HomeTemplateView(TemplateView):
    template_name = "index.html"


# router = routers.DefaultRouter()
# router.register(
#     "stationInformation", views.stationInformationView, "stationInformation"
# )
# router.register("selector_Options", views.selector_OptionsView, "selector_Options")

urlpatterns = [
    path("admin", admin.site.urls),
    path("bikeTour/api/info", functions.bt_leaflet_map.as_view()),
    path("bikeTour/api/weather", functions.weather),
    path("bikeTour/api/direction", functions.btdirection),
    path("bikeTour/api/near500m", functions.btnear_500),
    path("dodo/api/book", functions.dodoMoa),
    re_path(r"", HomeTemplateView.as_view(), name="home"),
    # path("bikeDash/api/", include(router.urls)),
    # path("bikeDash/api/testing/", functions.plots.as_view()),
    # path("moonLight/api/departureInfo", functions.departureInfo),
    # path("moonLight/api/leafletMap", functions.ml_leaflet_map.as_view()),
]


from django.conf import settings

if settings.DEBUG:
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
