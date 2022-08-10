from rest_framework import serializers
from .models import *


class departure_infoSerializer(serializers.ModelSerializer):
    class Meta:
        model = departure_info
        fields = "__all__"


# Serializers = Json으로 Return할 Column을 택하는 단계

# 제목, 저자, 주제분류 번호, 도서관 명 중요
class dodomoa_infoSerializer(serializers.ModelSerializer):
    class Meta:
        model = departure_info
        fields = "__all__"
