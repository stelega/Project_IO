"""empty message

Revision ID: 377b75bd4ff9
Revises: 5138b49b8baf
Create Date: 2020-05-17 04:02:21.714897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '377b75bd4ff9'
down_revision = '5138b49b8baf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'employee', ['employee_id'])
    op.add_column('hall', sa.Column('name', sa.String(length=80), nullable=True))
    op.create_unique_constraint(None, 'hall', ['name'])
    op.create_unique_constraint(None, 'hall', ['hall_id'])
    op.create_unique_constraint(None, 'movie', ['movie_id'])
    op.create_unique_constraint(None, 'seance', ['seance_id'])
    op.add_column('seat', sa.Column('number', sa.Integer(), nullable=True))
    op.create_unique_constraint(None, 'seat', ['seat_id'])
    op.create_unique_constraint(None, 'ticket', ['ticket_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'ticket', type_='unique')
    op.drop_constraint(None, 'seat', type_='unique')
    op.drop_column('seat', 'number')
    op.drop_constraint(None, 'seance', type_='unique')
    op.drop_constraint(None, 'movie', type_='unique')
    op.drop_constraint(None, 'hall', type_='unique')
    op.drop_constraint(None, 'hall', type_='unique')
    op.drop_column('hall', 'name')
    op.drop_constraint(None, 'employee', type_='unique')
    # ### end Alembic commands ###
