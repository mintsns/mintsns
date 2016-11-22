# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import collections
import copy
import datetime
import decimal
import itertools
import uuid
import warnings
from base64 import b64decode, b64encode
from functools import total_ordering

from django import forms
from django.apps import apps
from django.conf import settings
from django.core import checks, exceptions, validators
# When the _meta object was formalized, this exception was moved to
# django.core.exceptions. It is retained here for backwards compatibility
# purposes.
from django.core.exceptions import FieldDoesNotExist  # NOQA
from django.db import connection, connections, router
from django.db.models.query_utils import DeferredAttribute, RegisterLookupMixin
from django.utils import six, timezone
from django.utils.datastructures import DictWrapper
from django.utils.dateparse import (
    parse_date, parse_datetime, parse_duration, parse_time,
)
from django.utils.deprecation import (
    RemovedInDjango20Warning, warn_about_renamed_method,
)
from django.utils.duration import duration_string
from django.utils.encoding import (
    force_bytes, force_text, python_2_unicode_compatible, smart_text,
)
from django.utils.functional import Promise, cached_property, curry
from django.utils.ipv6 import clean_ipv6_address
from django.utils.itercompat import is_iterable
from django.utils.text import capfirst
from django.utils.translation import ugettext_lazy as _


from django.db.models import BigIntegerField

class PositiveBigIntegerField(BigIntegerField):
    empty_strings_allowed = False
    description = _("Big (8 byte) positive integer")

    def db_type(self, connection):
        """
        Returns MySQL-specific column data type. Make additional checks
        to support other backends.
        """
        return 'bigint UNSIGNED'

    def formfield(self, **kwargs):
        defaults = {'min_value': 0,
                    'max_value': BigIntegerField.MAX_BIGINT * 2 - 1}
        defaults.update(kwargs)
        return super(PositiveBigIntegerField, self).formfield(**defaults)