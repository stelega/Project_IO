from flask_restful import reqparse
from sqlalchemy import desc


def prepare_and_run_query(query, args):
    paginate = parse_pagination_params()
    query_params = parse_query_params()
    if query_params['order_by'] not in args.keys():
        raise ValueError('Attempt to order results by not existing column: {}'.format(query_params['order_by']))
    query = order_query(query, query_params['order_by'], query_params['desc'])
    count = query.count()
    if paginate is not None:
        items = query.paginate(page=paginate['page'], per_page=paginate['per_page']).items
    else:
        items = query.all()
    return items, count


def parse_pagination_params():
    parser = reqparse.RequestParser()
    parser.add_argument('page', type=int)
    parser.add_argument('per_page', type=int)
    args = parser.parse_args()
    return args if None not in args.values() else None


def parse_query_params():
    parser = reqparse.RequestParser()
    parser.add_argument('order_by')
    parser.add_argument('desc', type=bool)
    args = parser.parse_args()
    if args['desc'] is None:
        args['desc'] = False
    return args


def order_query(query, column, descending):
    if descending:
        return query.order_by(desc(column))
    else:
        return query.order_by(column)
