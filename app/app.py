from flask import Flask, render_template, request

app = Flask(__name__)

def get_brutal_advice(facts, feelings, hope):
    """
    Analyzes user input and generates brutally honest advice based on keywords.
    """
    
    # 1. Opening Reality Check
    opening = "Okay, let's be real. Aku takkan sugarcoat benda ni."

    # Default components
    breakdown = f"Fact: {facts}"
    brutal_truth = ""
    verdict = ""
    emotional_close = "Truth hurts, tapi lagi sakit kalau tipu diri sendiri."

    # 2. Dynamic Breakdown & Brutal Truth based on keywords
    
    # Relationship issues
    if any(keyword in facts.lower() for keyword in ["dia", "partner", "bf", "gf", "crush", "ex"]):
        breakdown += f"\\nFeelings: Kau rasa {feelings}, dan kau harap {hope if hope else 'benda jadi lain'}."
        if any(keyword in facts.lower() for keyword in ["ignore", "bluetick", "seen", "tak reply"]):
            brutal_truth = "🔥 Orang yang betul-betul nak, dia akan cari masa, bukan alasan. Kau bukan option, kau tu a whole package."
            verdict = "Verdict: Stop tunggu text dia. Pergi buat benda yang buat kau happy. Your phone should not be your life's remote control."
        elif any(keyword in facts.lower() for keyword in ["gaduh", "bergaduh", "argue", "fight"]):
            brutal_truth = "🔥 Kalau asyik gaduh benda sama, a 'sorry' is just a pause button, not a fix. The real problem is the pattern."
            verdict = "Verdict: Either you both fix the root problem, or you're just signing up for a sequel to the same bad movie."
        else:
            brutal_truth = "🔥 Kau tengah analyze text dia macam esok exam. Relax. Overthinking takkan ubah a single thing."
            verdict = "Verdict: Live your life. Kalau dia nak jadi sebahagian daripadanya, dia akan tunjuk."

    # Career/Life confusion
    elif any(keyword in feelings.lower() for keyword in ["confused", "lost", "stuck", "tak tahu", "dilemma"]):
        breakdown += f"\\nSituation: {facts}\\nYour Head: Penuh dengan 'what if'."
        brutal_truth = "🔥 Kau bukan 'confused'. Kau takut nak buat pilihan yang kau dah tahu betul. The right path is usually the harder one."
        verdict = "Verdict: Buat satu benda kecik hari ni yang lead to the life you want. Stop waiting for a magical sign."
        
    # Generic for anything else
    else:
        breakdown += "\\nReality: Kau pusing-pusing cerita yang sama. Let's cut to the chase."
        brutal_truth = "🔥 The situation is what it is. The only thing you can control is how you react to it. Stop being a passenger in your own life."
        verdict = "Verdict: Decide what you want, and take one step towards it. Even a small one. Action is clarity."

    return {
        "opening": opening,
        "breakdown": breakdown,
        "brutal_truth": brutal_truth,
        "verdict": verdict,
        "emotional_close": emotional_close,
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-advice', methods=['POST'])
def get_advice():
    facts = request.form.get('facts', '')
    feelings = request.form.get('feelings', '')
    hope = request.form.get('hope', '')
    
    advice = get_brutal_advice(facts, feelings, hope)
    
    return render_template('index.html', advice=advice)

if __name__ == '__main__':
    app.run(debug=True)
