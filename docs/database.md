Opervia — Database Domain Model

Overview

This document defines the initial database domain model for the Opervia MVP.

Opervia uses a centralized database structure that supports different types of organizations without creating organization-specific SQL tables.

MVP Entities

Organization

User

Department

Invitation

Request Category

Request

Comment

Audit History

Entity Fields

Organization

Field

Description

id

Primary key

name

Organization name

email

Organization email

contact

Contact information

created_at

Creation timestamp

status

Organization status

User

Field

Description

id

Primary key

username

User login name

password_hash

Securely hashed password

email

User email

contact

Contact information

organization_id

Foreign key to Organization

department_id

Foreign key to Department

role

ADMIN or USER

created_at

Creation timestamp

status

User status

Department

Field

Description

id

Primary key

name

Department name

organization_id

Foreign key to Organization

created_at

Creation timestamp

Invitation

Field

Description

id

Primary key

email

Invited user's email

organization_id

Foreign key to Organization

invited_by

Foreign key to User

token

Unique invitation token

status

Invitation status

expires_at

Invitation expiry time

created_at

Creation timestamp

Request Category

Field

Description

id

Primary key

name

Category name

organization_id

Foreign key to Organization

description

Category description

active

Whether the category is active

Request

Field

Description

id

Primary key

title

Request title

description

User's description of the problem/request

category_id

Foreign key to Request Category

priority

Request priority

status

Current request status

created_by

Foreign key to User

organization_id

Foreign key to Organization

created_at

Creation timestamp

updated_at

Last update timestamp

Comment

Field

Description

id

Primary key

request_id

Foreign key to Request

user_id

Foreign key to User

content

Comment text

created_at

Creation timestamp

Audit History

Field

Description

id

Primary key

request_id

Foreign key to Request

user_id

Foreign key to User

action

Action performed

old_value

Previous value

new_value

New value

created_at

Creation timestamp

Relationships

Relationship

Cardinality

Organization → User

1

Organization → Department

1

Organization → Invitation

1

Organization → Request Category

1

Organization → Request

1

Department → User

1

User → Request

1

User → Comment

1

User → Audit History

1

Request Category → Request

1

Request → Comment

1

Request → Audit History

1

Design Decisions

Centralized request structure

Opervia does not create different database tables for different organizations.

A school, company, hospital, NGO, or association can use the same request structure. Users describe their actual problem or request through the standard request fields.

Organizations can configure:

Request categories

Priority options

Status options

Which standard fields are required

A fully dynamic form builder is outside the MVP.

Authentication

Opervia uses one common login system.

After authentication, the user's role determines the dashboard:

ADMIN → Admin Dashboard

USER → User Dashboard

Organization joining

Users can join an organization through:

A specific invitation link sent by the admin

An organization join ID/code

Notifications

Notifications are not part of the MVP and may be added in a future version.

Assignment

The MVP does not include worker assignment. Organization admins manage requests directly.

ER Diagram



Notes

Primary keys uniquely identify records.

Foreign keys establish relationships between entities.

Passwords must never be stored as plain text; only secure password hashes are stored.

Indexes will be added later based on actual query and performance requirements.

This is the domain model for the MVP. The final SQL schema will be created during the implementation stage.
