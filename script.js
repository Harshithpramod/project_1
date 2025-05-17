document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatArea = document.getElementById('chat-area');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const quickActions = document.querySelectorAll('.quick-action');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Modal elements
    const recipeModal = document.getElementById('recipe-modal');
    const calorieModal = document.getElementById('calorie-modal');
    const mealplanModal = document.getElementById('mealplan-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    
    // Recipe modal elements
    const recipeTitle = document.getElementById('recipe-title');
    const recipeImg = document.getElementById('recipe-img');
    const recipeTime = document.getElementById('recipe-time');
    const recipeServings = document.getElementById('recipe-servings');
    const recipeCalories = document.getElementById('recipe-calories');
    const recipeIngredients = document.getElementById('recipe-ingredients');
    const recipeInstructions = document.getElementById('recipe-instructions');
    
    // Calorie calculator elements
    const calculateCaloriesBtn = document.getElementById('calculate-calories');
    const calorieResult = document.getElementById('calorie-result');
    
    // Meal plan elements
    const generateMealplanBtn = document.getElementById('generate-mealplan');
    const mealplanResult = document.getElementById('mealplan-result');
    
    // Sample recipe database
    const recipes = [
        {
            id: 1,
            title: "Avocado Toast with Egg",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            time: "10 mins",
            servings: 1,
            calories: 350,
            ingredients: [
                "1 slice whole grain bread",
                "1/2 ripe avocado",
                "1 egg",
                "Salt and pepper to taste",
                "Red pepper flakes (optional)",
                "1 tsp olive oil"
            ],
            instructions: [
                "Toast the bread until golden and crisp.",
                "Mash the avocado in a small bowl and season with salt and pepper.",
                "Heat olive oil in a small pan over medium heat. Fry the egg to your liking.",
                "Spread the mashed avocado on the toast. Top with the fried egg.",
                "Season with additional salt, pepper, and red pepper flakes if desired."
            ]
        },
        {
            id: 2,
            title: "Vegetable Stir Fry",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            time: "20 mins",
            servings: 2,
            calories: 280,
            ingredients: [
                "2 cups mixed vegetables (bell peppers, broccoli, carrots, snap peas)",
                "1 tbsp olive oil",
                "2 cloves garlic, minced",
                "1 tbsp ginger, grated",
                "2 tbsp soy sauce",
                "1 tbsp honey",
                "1 tsp sesame oil",
                "Sesame seeds for garnish"
            ],
            instructions: [
                "Chop all vegetables into bite-sized pieces.",
                "Heat olive oil in a large pan or wok over medium-high heat.",
                "Add garlic and ginger, stir for 30 seconds until fragrant.",
                "Add vegetables and stir fry for 5-7 minutes until crisp-tender.",
                "In a small bowl, mix soy sauce, honey, and sesame oil.",
                "Pour sauce over vegetables and toss to coat. Cook for 1 more minute.",
                "Garnish with sesame seeds and serve hot."
            ]
        },
        {
            id: 3,
            title: "Berry Smoothie Bowl",
            image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            time: "5 mins",
            servings: 1,
            calories: 320,
            ingredients: [
                "1 frozen banana",
                "1/2 cup mixed berries (strawberries, blueberries, raspberries)",
                "1/2 cup almond milk",
                "1 tbsp chia seeds",
                "1 tsp honey (optional)",
                "Toppings: granola, coconut flakes, fresh berries"
            ],
            instructions: [
                "Combine banana, berries, almond milk, chia seeds, and honey in a blender.",
                "Blend until smooth and creamy. Add more milk if too thick.",
                "Pour into a bowl and add your favorite toppings.",
                "Enjoy immediately with a spoon!"
            ]
        }
    ];
    
    // Food calorie database (per 100g unless specified)
    const foodDatabase = {
        "banana": { calories: 89, servingSize: "1 medium (118g)" },
        "apple": { calories: 52, servingSize: "1 medium (182g)" },
        "chicken breast": { calories: 165, servingSize: "100g cooked" },
        "brown rice": { calories: 111, servingSize: "100g cooked" },
        "avocado": { calories: 160, servingSize: "100g" },
        "egg": { calories: 68, servingSize: "1 large (50g)" },
        "whole grain bread": { calories: 247, servingSize: "100g (about 2 slices)" },
        "almond milk": { calories: 15, servingSize: "100ml" },
        "mixed vegetables": { calories: 65, servingSize: "100g" },
        "olive oil": { calories: 884, servingSize: "100ml" }
    };
    
    // Sample meal plans
    const mealPlans = {
        "balanced": {
            name: "Balanced Meal Plan",
            description: "A well-rounded plan with proteins, carbs, and healthy fats",
            meals: {
                "Day 1": [
                    { name: "Oatmeal with berries and nuts", calories: 350 },
                    { name: "Grilled chicken salad", calories: 450 },
                    { name: "Greek yogurt with honey", calories: 200 },
                    { name: "Salmon with quinoa and veggies", calories: 500 }
                ],
                "Day 2": [
                    { name: "Avocado toast with egg", calories: 400 },
                    { name: "Turkey and cheese wrap", calories: 450 },
                    { name: "Handful of almonds", calories: 160 },
                    { name: "Beef stir-fry with brown rice", calories: 550 }
                ]
            }
        },
        "vegetarian": {
            name: "Vegetarian Meal Plan",
            description: "Plant-based meals packed with nutrients",
            meals: {
                "Day 1": [
                    { name: "Smoothie bowl with granola", calories: 380 },
                    { name: "Quinoa and chickpea salad", calories: 420 },
                    { name: "Hummus with vegetable sticks", calories: 200 },
                    { name: "Lentil curry with rice", calories: 480 }
                ],
                "Day 2": [
                    { name: "Tofu scramble with toast", calories: 350 },
                    { name: "Vegetable and cheese panini", calories: 450 },
                    { name: "Fruit and nut mix", calories: 180 },
                    { name: "Eggplant parmesan with salad", calories: 520 }
                ]
            }
        }
    };
    
    // Event Listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    quickActions.forEach(button => {
        button.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            userInput.value = query;
            sendMessage();
        });
    });
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            openTab(tab);
        });
    });
    
    closeModals.forEach(button => {
        button.addEventListener('click', function() {
            recipeModal.style.display = 'none';
            calorieModal.style.display = 'none';
            mealplanModal.style.display = 'none';
        });
    });
    
    calculateCaloriesBtn.addEventListener('click', calculateCalories);
    generateMealplanBtn.addEventListener('click', generateMealPlan);
    
    // Functions
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';
        
        // Process the message and generate bot response
        setTimeout(() => {
            processUserMessage(message);
        }, 500);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender + '-message';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textNode = document.createElement('p');
        textNode.textContent = text;
        
        contentDiv.appendChild(textNode);
        messageDiv.appendChild(contentDiv);
        chatArea.appendChild(messageDiv);
        
        // Scroll to bottom
        chatArea.scrollTop = chatArea.scrollHeight;
    }
    
    function processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for recipe requests
        if (lowerMessage.includes('recipe') || lowerMessage.includes('recipes') || 
            lowerMessage.includes('breakfast') || lowerMessage.includes('lunch') || 
            lowerMessage.includes('dinner') || lowerMessage.includes('meal')) {
            handleRecipeRequest(message);
        }
        // Check for calorie calculation requests
        else if (lowerMessage.includes('calori') || lowerMessage.includes('nutrition') || 
                 lowerMessage.includes('calculate') || lowerMessage.includes('count')) {
            handleCalorieRequest(message);
        }
        // Check for meal plan requests
        else if (lowerMessage.includes('meal plan') || lowerMessage.includes('diet plan') || 
                 lowerMessage.includes('eating plan') || lowerMessage.includes('weekly menu')) {
            handleMealPlanRequest(message);
        }
        // Default response
        else {
            const responses = [
                "I'm not sure I understand. Could you clarify?",
                "I can help with recipes, calorie calculations, or meal plans. What would you like?",
                "Would you like help with recipes, nutrition information, or meal planning?",
                "I'm here to assist with your food and nutrition needs. How can I help?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'bot');
        }
    }
    
    function handleRecipeRequest(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific recipe types
        let matchingRecipes = [];
        
        if (lowerMessage.includes('breakfast')) {
            matchingRecipes = recipes.filter(recipe => 
                recipe.title.toLowerCase().includes('toast') || 
                recipe.title.toLowerCase().includes('smoothie')
            );
            if (matchingRecipes.length === 0) {
                matchingRecipes = [recipes[0], recipes[2]]; // Default breakfast recipes
            }
        } 
        else if (lowerMessage.includes('lunch') || lowerMessage.includes('dinner')) {
            matchingRecipes = recipes.filter(recipe => 
                recipe.title.toLowerCase().includes('stir') || 
                recipe.title.toLowerCase().includes('vegetable')
            );
            if (matchingRecipes.length === 0) {
                matchingRecipes = [recipes[1]]; // Default lunch/dinner recipe
            }
        } 
        else if (lowerMessage.includes('vegetarian') || lowerMessage.includes('vegan')) {
            matchingRecipes = recipes.filter(recipe => 
                !recipe.title.toLowerCase().includes('chicken') && 
                !recipe.title.toLowerCase().includes('egg')
            );
            if (matchingRecipes.length === 0) {
                matchingRecipes = [recipes[1], recipes[2]]; // Default vegetarian recipes
            }
        } 
        else {
            // Show all recipes if no specific type requested
            matchingRecipes = [...recipes];
        }
        
        if (matchingRecipes.length === 0) {
            addMessage("I couldn't find any recipes matching your request. Try something like 'healthy breakfast ideas' or 'vegetarian dinner recipes'.", 'bot');
            return;
        }
        
        // Show recipe options
        if (matchingRecipes.length > 1) {
            let response = "Here are some recipes you might like:\n";
            matchingRecipes.forEach((recipe, index) => {
                response += `${index + 1}. ${recipe.title} (${recipe.calories} calories, ${recipe.time})\n`;
            });
            response += "Type the number of the recipe you'd like to see, or ask for something more specific.";
            addMessage(response, 'bot');
        } 
        else {
            // If only one recipe matches, show it directly
            displayRecipeModal(matchingRecipes[0]);
        }
    }
    
    function handleCalorieRequest(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check if the message contains a food item
        let foodItem = null;
        let quantity = 1;
        let unit = 'whole';
        
        // Try to extract food item and quantity from message
        const quantityMatch = message.match(/\d+/);
        if (quantityMatch) {
            quantity = parseInt(quantityMatch[0]);
        }
        
        // Check for common food items
        for (const food in foodDatabase) {
            if (lowerMessage.includes(food)) {
                foodItem = food;
                break;
            }
        }
        
        if (foodItem) {
            // Calculate and display calories
            const calories = calculateFoodCalories(foodItem, quantity, unit);
            addMessage(calories, 'bot');
        } else {
            // Open calorie calculator modal
            addMessage("I can help you calculate calories. Let me open the calculator for you.", 'bot');
            setTimeout(() => {
                calorieModal.style.display = 'block';
            }, 800);
        }
    }
    
    function handleMealPlanRequest(message) {
        const lowerMessage = message.toLowerCase();
        let dietType = 'balanced';
        
        // Check for specific diet types
        if (lowerMessage.includes('vegetarian')) {
            dietType = 'vegetarian';
        } else if (lowerMessage.includes('vegan')) {
            dietType = 'vegan';
        } else if (lowerMessage.includes('keto')) {
            dietType = 'keto';
        } else if (lowerMessage.includes('mediterranean')) {
            dietType = 'mediterranean';
        }
        
        // Open meal plan modal with detected diet type
        addMessage(`I can create a ${dietType} meal plan for you. Let me open the planner.`, 'bot');
        setTimeout(() => {
            document.getElementById('diet-type').value = dietType;
            mealplanModal.style.display = 'block';
        }, 800);
    }
    
    function displayRecipeModal(recipe) {
        recipeTitle.textContent = recipe.title;
        recipeImg.src = recipe.image;
        recipeImg.alt = recipe.title;
        recipeTime.textContent = recipe.time;
        recipeServings.textContent = `${recipe.servings} serving${recipe.servings > 1 ? 's' : ''}`;
        recipeCalories.textContent = `${recipe.calories} calories`;
        
        // Clear previous ingredients and instructions
        recipeIngredients.innerHTML = '';
        recipeInstructions.innerHTML = '';
        
        // Add ingredients
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            recipeIngredients.appendChild(li);
        });
        
        // Add instructions
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            recipeInstructions.appendChild(li);
        });
        
        // Show modal
        recipeModal.style.display = 'block';
    }
    
    function calculateFoodCalories(food, quantity, unit) {
        if (!foodDatabase[food]) {
            return `I don't have nutrition data for ${food}. Try another food item.`;
        }
        
        const foodData = foodDatabase[food];
        let calories;
        
        // Handle different units (simplified for demo)
        if (unit === 'whole' && foodData.servingSize.includes('whole')) {
            calories = foodData.calories * quantity;
        } else if (unit === 'g') {
            calories = (foodData.calories / 100) * quantity;
        } else if (unit === 'oz') {
            calories = (foodData.calories / 100) * (quantity * 28.35); // 1 oz = 28.35g
        } else if (unit === 'cup') {
            // Very rough estimate (1 cup ≈ 120-240g depending on food)
            calories = (foodData.calories / 100) * (quantity * 150);
        } else {
            // Default to per 100g calculation
            calories = (foodData.calories / 100) * quantity;
        }
        
        return `${quantity} ${unit !== 'whole' ? unit : ''} ${food} contains approximately ${Math.round(calories)} calories.`;
    }
    
    function calculateCalories() {
        const foodItem = document.getElementById('food-item').value.trim().toLowerCase();
        const quantity = parseFloat(document.getElementById('quantity').value);
        const unit = document.getElementById('unit').value;
        
        if (!foodItem) {
            calorieResult.textContent = "Please enter a food item.";
            return;
        }
        
        // Find the food in database (simplified matching)
        let matchedFood = null;
        for (const food in foodDatabase) {
            if (food.includes(foodItem) || foodItem.includes(food)) {
                matchedFood = food;
                break;
            }
        }
        
        if (!matchedFood) {
            calorieResult.textContent = `I don't have nutrition data for ${foodItem}. Try another food item.`;
            return;
        }
        
        const result = calculateFoodCalories(matchedFood, quantity, unit);
        calorieResult.textContent = result;
    }
    
    function generateMealPlan() {
        const dietType = document.getElementById('diet-type').value;
        const calorieGoal = parseInt(document.getElementById('calorie-goal').value);
        const days = parseInt(document.getElementById('mealplan-days').value);
        
        // In a real app, this would generate a personalized plan based on inputs
        // For demo, we'll use sample plans and adjust calories
        
        if (!mealPlans[dietType]) {
            mealplanResult.innerHTML = `<p>Sorry, I don't have a ${dietType} meal plan available yet.</p>`;
            return;
        }
        
        const plan = mealPlans[dietType];
        let html = `<h3>${plan.name}</h3><p>${plan.description}</p>`;
        
        // Adjust plan based on calorie goal (simplified)
        const baseCalories = 2000; // Our sample plans are based on 2000 calories
        const adjustmentFactor = calorieGoal / baseCalories;
        
        // Show requested number of days (cycling through available days)
        const availableDays = Object.keys(plan.meals);
        for (let i = 0; i < Math.min(days, availableDays.length); i++) {
            const day = availableDays[i];
            html += `<div class="meal-day"><h3>${day}</h3>`;
            
            plan.meals[day].forEach(meal => {
                const adjustedCalories = Math.round(meal.calories * adjustmentFactor);
                html += `
                    <div class="meal-item">
                        <span class="meal-name">${meal.name}</span>
                        <span class="meal-calories">~${adjustedCalories} calories</span>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
        
        // Add nutrition tips based on diet type
        html += `<div class="nutrition-tips"><h3>Nutrition Tips</h3>`;
        if (dietType === 'vegetarian' || dietType === 'vegan') {
            html += `<p>Make sure to include plant-based protein sources like beans, lentils, tofu, and quinoa.</p>`;
        } else if (dietType === 'keto') {
            html += `<p>Focus on healthy fats and low-carb vegetables. Limit carb intake to 20-50g per day.</p>`;
        } else {
            html += `<p>Aim for a balance of protein, healthy carbs, and fats with each meal.</p>`;
        }
        html += `</div>`;
        
        mealplanResult.innerHTML = html;
    }
    
    function openTab(tabName) {
        // For this demo, we'll just show a message about the tab
        // In a full implementation, you would show different content for each tab
        const tabMessages = {
            'chat': "You're in the chat tab. Ask me anything about recipes, calories, or meal plans!",
            'recipes': "Browse recipes by category or search for specific dishes.",
            'calories': "Calculate the nutritional content of foods and meals.",
            'meal-plan': "Get personalized meal plans based on your dietary needs."
        };
        
        addMessage(tabMessages[tabName], 'bot');
        
        // Update active tab button
        tabButtons.forEach(button => {
            if (button.getAttribute('data-tab') === tabName) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Initialize with a welcome message
    setTimeout(() => {
        addMessage("You can ask me things like: 'Show me healthy breakfast recipes', 'How many calories are in a banana?', or 'Create a vegetarian meal plan'.", 'bot');
    }, 1500);
});