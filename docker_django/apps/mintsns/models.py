from django.db import models
from django.db.models import Model
from django.db.models import PositiveSmallIntegerField, CharField, EmailField, TextField, DateField, DateTimeField, ForeignKey, BooleanField
from .db.models.fields.custom_fields import PositiveBigIntegerField




# ユーザー
class User(Model):
    name = CharField(max_length=32)
    google_id = CharField(max_length=32)
    mail = EmailField()


# ゾーン
class StreamZone(Model):
    name = CharField(max_length=32)

# ゾーンのOr条件
class OrCondition(Model):
    name = CharField(max_length=32)
    stream_zone = ForeignKey(StreamZone, related_name='or_conditions')

# ゾーン条件
class Condition(Model):
    TYPE_OVER = 0
    TYPE_LESS = 1
    TYPE_EXCLUDE = 2
    TYPE_SET = (
        (TYPE_OVER, "以上"),
        (TYPE_LESS, "以下"),
        (TYPE_EXCLUDE, "除外")
    )
    name = CharField(max_length=32)
    condition_type = PositiveSmallIntegerField(choices=TYPE_SET, default=TYPE_OVER)
    value = PositiveBigIntegerField
    or_condition_zone = ForeignKey(OrCondition, related_name='conditions')

# ストリーム
class Stream(Model):
    name = CharField(max_length=32)
    zone = ForeignKey(StreamZone, related_name='zone')
    is_home = BooleanField(default=False)
    is_your_zone = BooleanField(default=False)
    is_public = BooleanField(default=False)
    post_scope = ForeignKey(u'self',blank=True,null=True)
    use_home_post_scope = BooleanField(default=False)
    is_included_post_scope = BooleanField(default=False)
    user = ForeignKey(User, related_name='user', null=False, default=False)


#----------------------------------------------------------------------------------------

# 削除予定
class Item(Model):
    text = TextField(blank=False, null=False)
    date_posted = DateField(auto_now=True)

# TODO: 削除予定
class Entry(Model):
    STATUS_DRAFT = "draft"
    STATUS_PUBLIC = "public"
    STATUS_SET = (
            (STATUS_DRAFT, "下書き"),
            (STATUS_PUBLIC, "公開中"),
    )
    title = CharField(max_length=128)
    body = TextField()
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    status = CharField(choices=STATUS_SET, default=STATUS_DRAFT, max_length=8)
    author = ForeignKey(User, related_name='entries')

# 削除予定
class Todo(Model):
    text = TextField()
