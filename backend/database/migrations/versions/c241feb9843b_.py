"""empty message

Revision ID: c241feb9843b
Revises: 5b17361ab514
Create Date: 2020-05-10 20:37:09.107645

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c241feb9843b'
down_revision = '5b17361ab514'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('test', sa.Column('test_value2', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('test', 'test_value2')
    # ### end Alembic commands ###