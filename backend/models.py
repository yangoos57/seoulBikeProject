from django.db import models


class departure_info(models.Model):
    value = models.IntegerField(db_index=True)
    label = models.CharField(max_length=40)


# ['도서명', '저자', '출판사', 'ISBN', '주제분류번호', '등록일자', '이미지주소', 'keywords', '0',
#        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
#        '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25',
#        '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37',
#        '38']


class dodomoaKeyword(models.Model):
    ISBN = models.BigIntegerField(db_index=True)
    key0 = models.CharField(max_length=40, null=True)
    key1 = models.CharField(max_length=40, null=True)
    key2 = models.CharField(max_length=40, null=True)
    key3 = models.CharField(max_length=40, null=True)
    key4 = models.CharField(max_length=40, null=True)
    key5 = models.CharField(max_length=40, null=True)
    key6 = models.CharField(max_length=40, null=True)
    key7 = models.CharField(max_length=40, null=True)
    key8 = models.CharField(max_length=40, null=True)
    key9 = models.CharField(max_length=40, null=True)
    key10 = models.CharField(max_length=40, null=True)
    key11 = models.CharField(max_length=40, null=True)
    key12 = models.CharField(max_length=40, null=True)
    key13 = models.CharField(max_length=40, null=True)
    key14 = models.CharField(max_length=40, null=True)
    key15 = models.CharField(max_length=40, null=True)
    key16 = models.CharField(max_length=40, null=True)
    key17 = models.CharField(max_length=40, null=True)
    key18 = models.CharField(max_length=40, null=True)
    key19 = models.CharField(max_length=40, null=True)
    key20 = models.CharField(max_length=40, null=True)
    key21 = models.CharField(max_length=40, null=True)
    key22 = models.CharField(max_length=40, null=True)
    key23 = models.CharField(max_length=40, null=True)
    key24 = models.CharField(max_length=40, null=True)
    key25 = models.CharField(max_length=40, null=True)
    key26 = models.CharField(max_length=40, null=True)
    key27 = models.CharField(max_length=40, null=True)
    key28 = models.CharField(max_length=40, null=True)
    key29 = models.CharField(max_length=40, null=True)
    key30 = models.CharField(max_length=40, null=True)
    key31 = models.CharField(max_length=40, null=True)
    key32 = models.CharField(max_length=40, null=True)
    key33 = models.CharField(max_length=40, null=True)
    key34 = models.CharField(max_length=40, null=True)
    key35 = models.CharField(max_length=40, null=True)
    key36 = models.CharField(max_length=40, null=True)
    key37 = models.CharField(max_length=40, null=True)
    key38 = models.CharField(max_length=40, null=True)


class dodomoaLibInfo(models.Model):
    지역 = models.CharField(max_length=5)  # 영등포, 마포, 아현 등등..
    ISBN = models.BigIntegerField(db_index=True)


class dodomoaBookInfo(models.Model):
    ISBN = models.BigIntegerField(db_index=True)
    도서명 = models.CharField(max_length=180)
    저자 = models.CharField(max_length=240)
    출판사 = models.CharField(max_length=50)
    주제분류번호 = models.CharField(max_length=20)
    등록일자 = models.DateField()
    이미지주소 = models.CharField(max_length=100)
