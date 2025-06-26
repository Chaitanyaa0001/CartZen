from flask import Blueprint, jsonify, request
from app.models.product import Product

products_bp = Blueprint('products', __name__)

@products_bp.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search = request.args.get('search')
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    sort = request.args.get('sort', 'name_asc')

    query = Product.query

    if category:
        query = query.filter_by(category=category)
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    # Sorting logic
    if sort == 'price_asc':
        query = query.order_by(Product.price.asc())
    elif sort == 'price_desc':
        query = query.order_by(Product.price.desc())
    elif sort == 'name_desc':
        query = query.order_by(Product.name.desc())
    else:
        query = query.order_by(Product.name.asc())  # Default

    # Pagination logic
    total_products = query.count()
    products = query.offset((page - 1) * limit).limit(limit).all()

    result = [
        {
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "category": p.category
        } for p in products
    ]

    return jsonify({
        "products": result,
        "total": total_products,
        "page": page,
        "limit": limit
    }), 200
