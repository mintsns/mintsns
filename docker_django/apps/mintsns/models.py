from django.db.models import Model
from django.db.models import PositiveSmallIntegerField, CharField, EmailField, TextField, DateField, DateTimeField, ForeignKey, BooleanField

from .db.models.fields.custom_fields import PositiveBigIntegerField


# ユーザー
class User(Model):
    name = CharField(max_length=32)
    google_id = CharField(max_length=32)
    mail = EmailField()
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)


# ゾーン
class StreamZone(Model):
    name = CharField(max_length=32)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

# ゾーンのOr条件
class OrCondition(Model):
    name = CharField(max_length=32)
    stream_zone = ForeignKey(StreamZone, related_name='or_conditions')
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

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
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

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
    user = ForeignKey(User, related_name='stream_user', null=False, default=False)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)


# ポスト
class Post(Model):
    user = ForeignKey(User, related_name='post_user', null=False, default=False)
    message = CharField(max_length=62001)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)


# コメント
class Comment(Model):
    user = ForeignKey(User, related_name='comment_user', null=False, default=False)
    message = CharField(max_length=62001)
    image_thumbnail_url = CharField(max_length=1024)
    image_url = CharField(max_length=1024)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)


# ポイントを与えたユーザー(ポスト)
class PostGavePointUser(Model):
    user = ForeignKey(User, related_name='post_gave_point_users', null=False, default=False)
    post = ForeignKey(Post, related_name='post', null=False, default=False)
    emoji = CharField(max_length=16)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

# ポイントを与えたユーザー(コメント)
class CommentGavePointUser(Model):
    user = ForeignKey(User, related_name='comment_gave_point_users', null=False, default=False)
    comment = ForeignKey(Comment, related_name='comment', null=False, default=False)
    emoji = CharField(max_length=16)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)



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
