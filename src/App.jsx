import { useState, useRef, useEffect } from "react"

export default function App() {

  const resultsRef = useRef(null)

    const rawProducts = [
    // Essentials
    { name: "Saffola Masala Oats", category: "Essentials", price: 180, servingSize: 40, protein: 4, sugar: 0.8, fat: 3.2, fiber: 3.2, calories: 156 },
    { name: "MyFitness Peanut Butter", category: "Essentials", price: 280, servingSize: 32, protein: 8, sugar: 2.5, fat: 16, fiber: 2, calories: 200 },
    { name: "Pintola Almond Butter", category: "Essentials", price: 450, servingSize: 32, protein: 7.5, sugar: 1.5, fat: 17, fiber: 3.5, calories: 205 },
    { name: "MuscleBlaze Whey Protein", category: "Essentials", price: 2500, servingSize: 30, protein: 22.5, sugar: 0.5, fat: 1.5, fiber: 0, calories: 114 },
    { name: "Happilo Mixed Nuts", category: "Essentials", price: 350, servingSize: 40, protein: 6.4, sugar: 1.6, fat: 20, fiber: 3.2, calories: 240 },
    { name: "Kellogg's Oats", category: "Essentials", price: 150, servingSize: 40, protein: 4.8, sugar: 0.4, fat: 3.2, fiber: 4, calories: 158 },
    { name: "Quaker Oats", category: "Essentials", price: 170, servingSize: 40, protein: 4.4, sugar: 0, fat: 3.2, fiber: 4, calories: 156 },
    { name: "Amul Cheese Slices", category: "Essentials", price: 130, servingSize: 20, protein: 4, sugar: 0, fat: 5, fiber: 0, calories: 62 },
    { name: "Amul Butter", category: "Essentials", price: 55, servingSize: 10, protein: 0.05, sugar: 0, fat: 8, fiber: 0, calories: 72 },
    { name: "Optimum Nutrition Whey", category: "Essentials", price: 3200, servingSize: 31, protein: 24, sugar: 1, fat: 1.2, fiber: 0, calories: 117 },

    // Snacks
    { name: "MuscleBlaze Protein Bar", category: "Snacks", price: 150, servingSize: 60, protein: 20, sugar: 1, fat: 8, fiber: 14, calories: 198 },
    { name: "Yoga Bar Protein Bar", category: "Snacks", price: 120, servingSize: 50, protein: 10.5, sugar: 4.5, fat: 14, fiber: 6, calories: 235 },
    { name: "Kellogg's Granola Bar", category: "Snacks", price: 30, servingSize: 42, protein: 3, sugar: 12, fat: 5.5, fiber: 2, calories: 185 },
    { name: "Epigamia Greek Yogurt", category: "Snacks", price: 80, servingSize: 170, protein: 17, sugar: 6.5, fat: 0.5, fiber: 0, calories: 105 },
    { name: "Yoga Bar Multigrain Energy", category: "Snacks", price: 90, servingSize: 68, protein: 9, sugar: 19, fat: 4.5, fiber: 3.5, calories: 255 },
    { name: "RiteBite Max Protein", category: "Snacks", price: 110, servingSize: 50, protein: 10, sugar: 7.5, fat: 8.5, fiber: 3.5, calories: 205 },
    { name: "Phool Makhana (Roasted)", category: "Snacks", price: 100, servingSize: 30, protein: 2.9, sugar: 0, fat: 3.8, fiber: 4.3, calories: 115 },
    { name: "Maggi 2-Minute Noodles", category: "Snacks", price: 14, servingSize: 70, protein: 6.3, sugar: 0.8, fat: 11.2, fiber: 1.4, calories: 315 },
    { name: "Britannia NutriChoice", category: "Snacks", price: 50, servingSize: 30, protein: 2.1, sugar: 4.5, fat: 6, fiber: 2.8, calories: 145 },
    { name: "Haldiram's Bhujia", category: "Snacks", price: 20, servingSize: 30, protein: 3, sugar: 1, fat: 13, fiber: 2, calories: 170 },

    // Drinks
    { name: "Amul Taaza Milk", category: "Drinks", price: 52, servingSize: 200, protein: 6.2, sugar: 9.6, fat: 3.2, fiber: 0, calories: 96 },
    { name: "Epigamia Milkshake", category: "Drinks", price: 60, servingSize: 200, protein: 7.5, sugar: 11.5, fat: 4.5, fiber: 0, calories: 145 },
    { name: "B Natural Mixed Fruit", category: "Drinks", price: 110, servingSize: 200, protein: 0.2, sugar: 23.5, fat: 0, fiber: 0, calories: 95 },
    { name: "Gatorade Sports Drink", category: "Drinks", price: 50, servingSize: 250, protein: 0, sugar: 14, fat: 0, fiber: 0, calories: 60 },
    { name: "Red Bull Energy Drink", category: "Drinks", price: 120, servingSize: 250, protein: 0, sugar: 27.5, fat: 0, fiber: 0, calories: 115 },
    { name: "Paper Boat Aam Panna", category: "Drinks", price: 40, servingSize: 200, protein: 0.2, sugar: 17.5, fat: 0.2, fiber: 0, calories: 85 },
    { name: "Real Active Coconut Water", category: "Drinks", price: 60, servingSize: 200, protein: 0.4, sugar: 7.5, fat: 0.2, fiber: 0, calories: 38 },
    { name: "Nestle Milo", category: "Drinks", price: 250, servingSize: 20, protein: 2.4, sugar: 8.5, fat: 1.8, fiber: 1.2, calories: 82 },
    { name: "Ovaltine", category: "Drinks", price: 300, servingSize: 20, protein: 2.2, sugar: 9.5, fat: 1.2, fiber: 0.8, calories: 78 },
    { name: "Ensure Nutrition Shake", category: "Drinks", price: 150, servingSize: 200, protein: 8.5, sugar: 14.5, fat: 5.5, fiber: 3, calories: 215 }
  ]

  function standardize(p) {
    const factor = 100 / p.servingSize

    return {
      name: p.name,
      category: p.category,
      price: Math.round((p.price / p.servingSize) * 100),
      protein: p.protein * factor,
      sugar: p.sugar * factor,
      fat: p.fat * factor,
      fiber: p.fiber * factor,
      calories: p.calories * factor
    }
  }

  const products = rawProducts.map(standardize)

  const [activeCategory, setActiveCategory] = useState("Essentials")
  const [showFormulaBuilder, setShowFormulaBuilder] = useState(false)
  const visibleProducts = products.filter(p => activeCategory === "All" || p.category === activeCategory)



  const [formula, setFormula] = useState("")
  const [results, setResults] = useState(visibleProducts)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    setShowResults(false)
  }, [activeCategory])



  function addToken(token) {
    setFormula(prev => prev + token)
  }

  function clearFormula() {
    setFormula("")
  }

  function applyUseCase(type) {

    if (type === "proteinValue")
      setFormula("protein/price")

    if (type === "lowSugar")
      setFormula("1/sugar")

    if (type === "fiberDensity")
      setFormula("fiber/calories")

    if (type === "highProtein")
      setFormula("protein")

    if (type === "balanced")
      setFormula("(protein+fiber)/sugar")

    if (type === "energy")
      setFormula("calories/price")

    if (type === "nutrientDensity")
      setFormula("protein/(fat+sugar)")

    if (type === "ketoFriendly")
      setFormula("fat/(sugar+calories)")

    if (type === "cleanBulking")
      setFormula("(calories+protein*10)/(sugar+1)")

    if (type === "weightLoss")
      setFormula("(protein+fiber)/calories")
  }

  function runComparison() {

    let filtered = [...visibleProducts]

    filtered = filtered.map(p => {

      let expr = formula

      Object.keys(p).forEach(key => {
        expr = expr.replaceAll(key, p[key])
      })

      let score = 0

      try {
        score = eval(expr)
      } catch {
        score = 0
      }

      return { ...p, score }

    })

    filtered.sort((a, b) => b.score - a.score)

    setResults(filtered)
    setShowResults(true)
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (

    <div className="landingPage">

      <div className="hero">
        <div className="heroContent">
          <div className="badge">🚀 Smart Nutrition Analysis</div>
          <h1>FoodCalc</h1>
          <p className="heroSubtitle">
            Make smarter food choices with data-driven insights
          </p>
          <p className="heroDescription">
            Compare nutritional values, filter products, and find the perfect balance between nutrition and budget. All values standardized per 100g for accurate comparison.
          </p>
          <div className="heroStats">
            <div className="stat">
              <div className="statNumber">30</div>
              <div className="statLabel">Products</div>
            </div>
            <div className="stat">
              <div className="statNumber">6</div>
              <div className="statLabel">Nutrients</div>
            </div>
            <div className="stat">
              <div className="statNumber">10</div>
              <div className="statLabel">Use Cases</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">

      <div className="sectionHeader" id="database">
        <h2 className="sectionTitle">📊 Product Database</h2>
        <p className="sectionDescription">Browse our curated nutrition database</p>
      </div>

      <div className="categoryTabs">
        {["All", "Essentials", "Snacks", "Drinks"].map(cat => (
          <button
            key={cat}
            className={`tabButton ${activeCategory === cat ? "activeTab" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="card tableCard">
        <h2>{activeCategory === "All" ? "All Products" : `${activeCategory}`} Information</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Protein</th>
              <th>Sugar</th>
              <th>Fat</th>
              <th>Fiber</th>
              <th>Calories</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.protein.toFixed(2)}</td>
                <td>{p.sugar.toFixed(2)}</td>
                <td>{p.fat.toFixed(2)}</td>
                <td>{p.fiber.toFixed(2)}</td>
                <td>{p.calories.toFixed(2)}</td>
                <td>₹{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sectionHeader">
        <h2 className="sectionTitle">🎯 Formula Use Cases</h2>
        <p className="sectionDescription">Pre-built formulas optimized for common nutrition goals</p>
      </div>

      <div className="card">

        <div className="useCasesGrid">

          <div className="useCase" onClick={() => applyUseCase("proteinValue")}>
            <h3>Protein per Rupee</h3>
            <p className="formula">protein/price</p>
            <p className="description">Find products that give you the most protein for your money. Ideal for budget-conscious fitness enthusiasts.</p>
          </div>

          <div className="useCase" onClick={() => applyUseCase("lowSugar")}>
            <h3>Low Sugar</h3>
            <p className="formula">1/sugar</p>
            <p className="description">Prioritize products with minimal sugar content. Perfect for maintaining stable blood sugar levels.</p>
          </div>

          <div className="useCase" onClick={() => applyUseCase("fiberDensity")}>
            <h3>Fiber Density</h3>
            <p className="formula">fiber/calories</p>
            <p className="description">Maximize fiber intake while keeping calories in check. Great for digestive health and satiety.</p>
          </div>

          <div className="useCase" onClick={() => applyUseCase("highProtein")}>
            <h3>High Protein</h3>
            <p className="formula">protein</p>
            <p className="description">Identify products with the absolute highest protein content per 100g.</p>
          </div>

          <div className="useCase" onClick={() => applyUseCase("balanced")}>
            <h3>Balanced Nutrition</h3>
            <p className="formula">(protein+fiber)/sugar</p>
            <p className="description">Optimize for high protein and fiber with low sugar. Ideal for overall nutritional balance.</p>
          </div>

          <div className="useCase" onClick={() => applyUseCase("energy")}>
            <h3>Energy Efficiency</h3>
            <p className="formula">calories/price</p>
            <p className="description">Get the most calories per rupee. Best for maximizing energy intake on a budget.</p>
          </div>

          <div className="useCase" onClick={() => applyUseCase("nutrientDensity")}>
            <h3>Lean Protein Score</h3>
            <p className="formula">protein/(fat+sugar)</p>
            <p className="description">Scientific ratio of high-quality protein to less desirable macros. Higher scores indicate leaner, cleaner protein sources with minimal fat and sugar.</p>
          </div>

          <div className="useCase" onClick={() => applyUseCase("ketoFriendly")}>
            <h3>Keto Friendly</h3>
            <p className="formula">fat/(sugar+calories)</p>
            <p className="description">Optimize for high fat and low sugar/carbs, calculating keto compatibility score.</p>
          </div>

          <div className="useCase" onClick={() => applyUseCase("cleanBulking")}>
            <h3>Clean Bulking</h3>
            <p className="formula">(calories+protein*10)/(sugar+1)</p>
            <p className="description">Maximum calories and protein while avoiding unnecessary sugar. Ideal for building muscle mass cleanly.</p>
          </div>

          <div className="useCase" onClick={() => applyUseCase("weightLoss")}>
            <h3>Weight Loss Support</h3>
            <p className="formula">(protein+fiber)/calories</p>
            <p className="description">Focus on satiety (protein and fiber) while minimizing caloric density.</p>
          </div>

        </div>

      </div>

      <div className="sectionHeader">
        <h2 className="sectionTitle">⚙️ Custom Formula Builder</h2>
        <p className="sectionDescription">Create your own custom ranking formula</p>
      </div>

      <div className="card">

        <h3 style={{marginTop: 0, color: '#1e293b', fontSize: '1.3em'}}>Ranking Formula</h3>

        <button onClick={() => setShowFormulaBuilder(!showFormulaBuilder)} className="primary" style={{marginBottom: "20px"}}>
          {showFormulaBuilder ? "Hide Advanced Formula Builder" : "⚙️ Advanced: Build Custom Formula"}
        </button>

        {showFormulaBuilder && (
          <div className="advancedFormulaContainer" style={{marginBottom: "20px", padding: "15px", background: "rgba(16,185,129,0.05)", borderRadius: "10px", border: "1px dashed rgba(16,185,129,0.3)"}}>
            <p style={{marginTop: 0, color: '#94a3b8', fontSize: '0.9em'}}>Select macros and operators to create a custom ranking score.</p>
            <div className="formulaButtons">

              <button onClick={() => addToken("protein")}>Protein</button>
              <button onClick={() => addToken("sugar")}>Sugar</button>
              <button onClick={() => addToken("fat")}>Fat</button>
              <button onClick={() => addToken("fiber")}>Fiber</button>
              <button onClick={() => addToken("calories")}>Calories</button>
              <button onClick={() => addToken("price")}>Price</button>

            </div>

            <div className="formulaButtons">

              <button onClick={() => addToken("+")}>+</button>
              <button onClick={() => addToken("-")}>-</button>
              <button onClick={() => addToken("*")}>*</button>
              <button onClick={() => addToken("/")}>/</button>
              <button onClick={() => addToken("(")}>(</button>
              <button onClick={() => addToken(")")}>)</button>

              <button onClick={clearFormula} className="danger">
                Clear
              </button>

            </div>
          </div>
        )}

        <div className="formulaDisplay">

          <b>Active Formula:</b> {formula || "Select a predefined use case or build your own"}

        </div>

        <button onClick={runComparison} className="primary large">
          Run Category Comparison
        </button>

      </div>

      {showResults && (
        <div>
          <div className="sectionHeader">
            <h2 className="sectionTitle">🏆 Comparison Results</h2>
            <p className="sectionDescription">Products ranked by your selected criteria</p>
          </div>
          <div className="card resultsCard" ref={resultsRef}>
          <table>
            <thead>
              <tr>
                <th className="highlight">Rank</th>
                <th>Product</th>
                <th>Category</th>
                <th>Protein</th>
                <th>Sugar</th>
                <th>Fat</th>
                <th>Fiber</th>
                <th>Calories</th>
                <th>Price</th>
                <th className="highlight">Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((p, i) => (
                <tr key={i}>
                  <td className="highlight">{i + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.protein.toFixed(2)}</td>
                  <td>{p.sugar.toFixed(2)}</td>
                  <td>{p.fat.toFixed(2)}</td>
                  <td>{p.fiber.toFixed(2)}</td>
                  <td>{p.calories.toFixed(2)}</td>
                  <td>₹{p.price}</td>
                  <td className="highlight">{p.score ? p.score.toFixed(3) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}

      <footer className="footer">
        <p>Made with ❤️ for smarter nutrition choices</p>
        <p className="footerSmall">All nutritional values are standardized per 100g for accurate comparison</p>
      </footer>

      </div>

      <style>
        {`

body{
background:#f3f4f6;
margin:0;
font-family:'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
scroll-behavior:smooth;
min-height:100vh;
padding:0;
color:#1f2937;
}

.landingPage{
min-height:100vh;
}

.hero{
background:linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
padding:80px 20px 100px;
text-align:center;
position:relative;
overflow:hidden;
box-shadow:0 10px 30px rgba(0,0,0,0.1);
border-bottom:1px solid rgba(59,130,246,0.3);
}

.hero::before{
content:'';
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
background:radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
animation:float 20s linear infinite;
pointer-events:none;
}

@keyframes float{
from{transform:translateY(0);}
to{transform:translateY(-100px);}
}

.heroContent{
position:relative;
z-index:1;
max-width:900px;
margin:0 auto;
animation:fadeInUp 1s ease-out;
}

@keyframes fadeInUp{
from{opacity:0; transform:translateY(30px);}
to{opacity:1; transform:translateY(0);}
}

.badge{
display:inline-block;
background:rgba(255,255,255,0.2);
backdrop-filter:blur(10px);
border:1px solid rgba(255,255,255,0.4);
padding:8px 20px;
border-radius:30px;
color:#ffffff;
font-size:14px;
font-weight:600;
margin-bottom:20px;
box-shadow:0 0 10px rgba(0,0,0,0.1);
}

.hero h1{
font-size:4em;
margin:20px 0;
color:#ffffff;
font-weight:800;
letter-spacing:-2px;
text-shadow:0 4px 10px rgba(0,0,0,0.2);
}

.heroSubtitle{
font-size:1.8em;
color:#bfdbfe;
margin:20px 0;
font-weight:600;
}

.heroDescription{
font-size:1.1em;
color:#eff6ff;
max-width:700px;
margin:20px auto 40px;
line-height:1.8;
}

.heroStats{
display:flex;
justify-content:center;
gap:50px;
margin-top:50px;
flex-wrap:wrap;
}

.stat{
text-align:center;
background:rgba(255,255,255,0.1);
padding:15px 30px;
border-radius:15px;
backdrop-filter:blur(5px);
border:1px solid rgba(255,255,255,0.2);
}

.statNumber{
font-size:3em;
font-weight:800;
color:#ffffff;
}

.statLabel{
font-size:1em;
color:#bfdbfe;
text-transform:uppercase;
letter-spacing:1px;
margin-top:5px;
font-weight:600;
}

.container{
max-width:1200px;
margin:auto;
padding:60px 30px;
}

.sectionHeader{
text-align:center;
margin:60px 0 30px;
}

.sectionTitle{
font-size:2.5em;
color:#111827;
margin:0 0 10px 0;
font-weight:800;
}

.sectionDescription{
font-size:1.2em;
color:#6b7280;
margin:0;
font-weight:400;
}

.card{
background:#ffffff;
padding:35px;
border-radius:20px;
margin-bottom:30px;
box-shadow:0 10px 25px rgba(0,0,0,0.05);
border:1px solid #e5e7eb;
transition:transform 0.3s, box-shadow 0.3s;
}

.card:hover{
transform:translateY(-4px);
box-shadow:0 15px 35px rgba(0,0,0,0.08);
}

.tableCard{
overflow-x:auto;
}

.card h2{
color:#111827;
font-size:1.5em;
margin-top:0;
border-bottom:3px solid #3b82f6;
display:inline-block;
padding-bottom:8px;
margin-bottom:20px;
}

.categoryTabs{
display:flex;
justify-content:center;
gap:15px;
margin-bottom:30px;
flex-wrap:wrap;
}

.tabButton{
background:#ffffff;
color:#4b5563;
border:1px solid #d1d5db;
padding:10px 24px;
border-radius:30px;
font-weight:600;
font-size:16px;
cursor:pointer;
transition:all 0.3s ease;
box-shadow:0 2px 5px rgba(0,0,0,0.05);
}

.tabButton:hover{
background:#f3f4f6;
color:#111827;
border-color:#9ca3af;
transform:translateY(-2px);
}

.activeTab{
background:linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
color:white;
border-color:#2563eb;
box-shadow:0 6px 15px rgba(37,99,235,0.3);
}

.activeTab:hover{
transform:translateY(0);
background:linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
color:white;
}

.useCasesGrid{
display:grid;
grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));
gap:15px;
margin-top:15px;
}

.useCase{
background:#f9fafb;
padding:25px;
border-radius:16px;
cursor:pointer;
transition:all 0.3s ease;
border:1px solid #e5e7eb;
}

.useCase:hover{
background:#ffffff;
border-color:#3b82f6;
transform:translateY(-4px);
box-shadow:0 10px 25px rgba(59,130,246,0.15);
}

.useCase h3{
margin:0 0 12px 0;
color:#1f2937;
font-size:20px;
font-weight:800;
}

.useCase .formula{
background:#eff6ff;
padding:12px 16px;
border-radius:10px;
font-family:'Courier New', monospace;
color:#2563eb;
margin:12px 0;
font-weight:bold;
font-size:16px;
border-left:5px solid #2563eb;
}

.useCase .description{
margin:12px 0 0 0;
color:#6b7280;
font-size:14px;
line-height:1.7;
}

.formulaButtons button{
margin:5px;
border:none;
padding:10px 20px;
border-radius:8px;
cursor:pointer;
background:#f3f4f6;
border:1px solid #d1d5db;
color:#374151;
font-weight:600;
transition:all 0.2s;
}

.formulaButtons button:hover{
background:#e5e7eb;
border-color:#9ca3af;
}

.danger{
background:#fef2f2 !important;
color:#dc2626 !important;
border-color:#fecaca !important;
}

.danger:hover{
background:#fee2e2 !important;
}

.formulaDisplay{
margin-top:15px;
padding:14px;
background:#eff6ff;
border-radius:10px;
border-left:4px solid #3b82f6;
font-family:'Courier New', monospace;
font-size:16px;
color:#1e3a8a;
}

.primary{
background:linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
color:#ffffff;
border:none;
padding:14px 32px;
border-radius:10px;
font-size:16px;
font-weight:700;
cursor:pointer;
box-shadow:0 4px 15px rgba(37,99,235,0.3);
transition:all 0.3s;
}

.primary:hover{
transform:translateY(-2px);
box-shadow:0 6px 20px rgba(37,99,235,0.4);
background:linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
}

.large{
padding:16px 36px;
margin-top:20px;
font-size:18px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:10px;
border-radius:12px;
overflow:hidden;
background:#ffffff;
border:1px solid #e5e7eb;
}

th{
background:#f8fafc;
color:#475569;
padding:16px;
font-weight:700;
text-transform:uppercase;
font-size:12px;
letter-spacing:1px;
border-bottom:2px solid #e2e8f0;
}

td{
padding:14px;
border-bottom:1px solid #f1f5f9;
text-align:center;
color:#334155;
font-weight:500;
font-size:14px;
}

tbody tr:hover{
background:#f0fdf4;
}

tbody tr:last-child td{
border-bottom:none;
}

th.highlight{
background:#f0fdfa;
color:#0f766e;
}

td.highlight{
background:#ecfdf5;
font-weight:700;
color:#059669;
font-size:16px;
}

.resultsCard{
border:2px solid #3b82f6;
box-shadow:0 10px 30px rgba(59,130,246,0.15);
}

.footer{
text-align:center;
padding:40px 20px;
margin-top:80px;
color:#6b7280;
border-top:1px solid #e5e7eb;
}

.footer p{
margin:10px 0;
font-weight:500;
}

.footerSmall{
font-size:0.9em;
color:#9ca3af;
}

`}
      </style>
    </div>
  )
}
