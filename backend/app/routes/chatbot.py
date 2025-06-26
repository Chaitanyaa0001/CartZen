from flask import Blueprint, request, jsonify
from app.utils.nlp_engine import extract_intent_and_entities
from app.models.product import Product

chatbot_bp = Blueprint("chatbot", __name__)

@chatbot_bp.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message", "")

    intent, entities = extract_intent_and_entities(message)
    print("INTENT:", intent)
    print("ENTITIES:", entities)

    if intent == "greeting":
        return jsonify({"response": "Hello! How can I assist you today?"})
    
    elif intent == "thanks":
        return jsonify({"response": "You're welcome! Let me know if you need anything else."})

    elif intent == "search_product":
        query = Product.query

        # Fuzzy match category
        if "category" in entities:
            category = entities["category"]
            query = query.filter(Product.category.ilike(f"%{category}%"))

        products = query.limit(5).all()

        result = [
            {
                "name": p.name,
                "price": p.price,
                "description": p.description
            } for p in products
        ]

        return jsonify({
            "response": f"Here are some products in {entities.get('category', 'all categories')}:",
            "products": result
        })

    return jsonify({"response": "I'm sorry, I didn't understand that. Can you rephrase?"})
