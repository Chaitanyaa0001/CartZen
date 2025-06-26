from app.models.product import Product

def get_all_products(category=None, search=None):
    query = Product.query

    if category:
        query = query.filter_by(category=category)
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    products = query.all()
    return products
