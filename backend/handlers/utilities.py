from flask_restful import reqparse, inputs
from sqlalchemy import desc

from handlers.messages import ApiMessages


def prepare_and_run_query(query, args):
    paginate = parse_pagination_params()
    query_params = parse_query_params()
    if query_params['orderBy'] is not None and query_params['orderBy'] not in args.keys():
        raise ValueError('{}{}'.format(ApiMessages.NOT_EXISTING_COLUMN_SORT.value, query_params['orderBy']))
    if query_params['orderBy'] is not None:
        query = order_query(query, query_params['orderBy'], query_params['desc'])
    count = query.count()
    if paginate is not None and (paginate['page'] - 1) * paginate['perPage'] < count:
        items = query.paginate(page=paginate['page'], per_page=paginate['perPage']).items
    else:
        items = query.all()
    return items, count


def parse_pagination_params():
    parser = reqparse.RequestParser()
    parser.add_argument('page', type=int)
    parser.add_argument('perPage', type=int)
    args = parser.parse_args()
    return args if None not in args.values() else None


def parse_query_params():
    parser = reqparse.RequestParser()
    parser.add_argument('orderBy')
    parser.add_argument('desc', type=inputs.boolean)
    args = parser.parse_args()
    if args['orderBy'] == 'movie':
        args['orderBy'] = 'title'
    if args['orderBy'] == 'hall':
        args['orderBy'] = 'name'
    return args


def order_query(query, column, descending):
    if descending:
        return query.order_by(desc(column))
    else:
        return query.order_by(column)
