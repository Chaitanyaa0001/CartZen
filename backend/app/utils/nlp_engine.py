import re

def extract_intent_and_entities(message):
    message = message.lower()

    # Normalize common Hindi terms to English
    hindi_to_english = {
        "namaste": "hello",
        "hi": "hello",
        "shukriya": "thank you",
        "dhanyavaad": "thank you",
        "kya": "what",
        "kaun": "who",
        "mobile": "phone",
        "dikhaiye": "show",
        "chahiye": "need"
    }

    for hindi, eng in hindi_to_english.items():
        message = message.replace(hindi, eng)

    # Intent classification
    if any(greet in message for greet in ["hello", "hi", "hey", "namaste", "good morning", "good evening"]):
        return "greeting", {}

    elif any(thank in message for thank in ["thank", "thanks", "shukriya", "dhanyavaad"]):
        return "thanks", {}

    elif any(word in message for word in ["show", "find", "buy", "need", "search", "browse"]):
        # Map keyword to actual database categories
        category_keywords = {
            "phone": "electronics",
            "mobile": "electronics",
            "laptop": "electronics",
            "camera": "electronics",
            "speaker": "electronics",
            "tablet": "electronics",
            "tv": "electronics",
            "television": "electronics",
            "headphone": "electronics",
            "earbud": "electronics",
            "book": "books",
            "novel": "books",
            "shoe": "shoes",
            "tshirt": "clothing",
            "hoodie": "clothing",
            "shirt": "clothing",
            "pant": "clothing",
            "watch": "fashion",
            "bag": "fashion",
            "mat": "fitness",
            "band": "fitness",
            "dumbbell": "fitness",
            "kettle": "home_appliances",
            "oven": "home_appliances",
            "iron": "home_appliances",
        }

        for keyword, category in category_keywords.items():
            if keyword in message:
                return "search_product", {"category": category}

        return "search_product", {}

    else:
        return "unknown", {}
