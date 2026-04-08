import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, MapPin, Star, IndianRupee, Clock, Utensils, Camera, Landmark, Calculator, Plane } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const cities = ["Mumbai", "Pune", "Nagpur", "Aurangabad", "Nashik", "Kolhapur"];

const TripDurationOptions = [
  { value: "1", label: "1 Day" },
  { value: "2", label: "2 Days" },
  { value: "3", label: "3 Days" },
  { value: "4", label: "4 Days" },
  { value: "5", label: "5 Days" },
  { value: "6", label: "6 Days" },
  { value: "7", label: "1 Week" },
  { value: "14", label: "2 Weeks" },
];

const TripTypeOptions = [
  { value: "heritage", label: "Heritage Tour" },
  { value: "food", label: "Food Trail" },
  { value: "adventure", label: "Adventure" },
  { value: "spiritual", label: "Spiritual Journey" },
  { value: "nature", label: "Nature Exploration" },
];

const BudgetOptions = [
  { value: "budget", label: "Budget-friendly (₹5,000-₹15,000)" },
  { value: "midrange", label: "Mid-range (₹15,000-₹30,000)" },
  { value: "luxury", label: "Luxury (₹30,000+)" },
];

const MoodOptions = [
  { value: "adventurous", label: "Adventurous" },
  { value: "relaxed", label: "Relaxed" },
  { value: "cultural", label: "Cultural" },
  { value: "romantic", label: "Romantic" },
  { value: "foodie", label: "Foodie" },
];

// const fetchItineraryFromAPI = async (
//   destination: string,
//   tripTypes: string[],
//   duration: string,
//   budget: string,
//   mood: string
// ) => {
//   try {
//     const response = await fetch("https://your-backend-api.com/generate-itinerary", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ destination, tripTypes, duration, budget, mood }),
//     });
//     const data = await response.json();
//     return data.itinerary;
//   } catch (error) {
//     console.error("API error:", error);
//    // return getCustomizedItinerary(destination, tripTypes[0], duration, budget); // fallback
 
//     return {
//       title: "Error",
//       description: "Unable to fetch itinerary. Please try again later.",
//       days: [],
//       estimatedCost: "N/A",
//       accommodationSuggestions: [],
//       foodRecommendations: [],
//       transportOptions: [],
//     };

//   }
// };

const fetchItineraryFromAPI = async (
  destination: string,
  tripTypes: string[],
  duration: string,
  budget: string,
  mood: string
) => {
  const prompt = `
You are a travel itinerary planner. Create a detailed ${duration}-day itinerary for ${destination}, based on:
- Mood: ${mood}
- Trip types: ${tripTypes.join(", ")}
- Budget: ${budget}

Return this exact JSON format:
{
  "title": "...",
  "description": "...",
  "estimatedCost": "...",
  "accommodationSuggestions": [{"name": "...", "type": "...", "priceRange": "..."}],
  "foodRecommendations": [{"name": "...", "cuisine": "...", "budget": "..."}],
  "transportOptions": [{"type": "...", "cost": "..."}],
  "days": [
    {
      "day": 1,
      "activities": [{"time": "9:00 AM", "activity": "...", "type": "food/sight/activity"}]
    }
  ]
}
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${import.meta.env.VITE_GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // ✅ updated
        messages: [
          { role: "system", content: "You are a helpful travel assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();

    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content returned from Groq");

    const parsed = JSON.parse(content);
    return parsed;

  } catch (error) {
    console.error("Groq API Error:", error);

    const fallbackType = tripTypes.length > 0 ? tripTypes[0] : "heritage";
    return getCustomizedItinerary(destination.toLowerCase(), fallbackType, duration, budget);
  }
};



const getCustomizedItinerary = (destination: string, tripType: string, duration: string, budget: string) => {
  let itinerary = {
    title: `Your ${tripType.charAt(0).toUpperCase() + tripType.slice(1)} Adventure in ${destination}`,
    description: `A personalized ${duration}-day itinerary for exploring ${destination}'s best attractions.`,
    days: [
      {
        day: 1,
        activities: [
          { time: "09:00 AM", activity: "Start your day with breakfast at a local cafe", type: "food" },
          { time: "10:30 AM", activity: "Visit the city's main attraction", type: "sight" },
          { time: "01:00 PM", activity: "Lunch at a popular local restaurant", type: "food" },
          { time: "03:00 PM", activity: "Explore the historical part of the city", type: "sight" },
          { time: "07:00 PM", activity: "Dinner at a traditional restaurant", type: "food" },
        ]
      },
      {
        day: 2,
        activities: [
          { time: "08:30 AM", activity: "Breakfast at hotel", type: "food" },
          { time: "10:00 AM", activity: "Day trip to nearby attraction", type: "sight" },
          { time: "01:30 PM", activity: "Lunch at countryside restaurant", type: "food" },
          { time: "04:00 PM", activity: "Visit local market for souvenirs", type: "activity" },
          { time: "07:30 PM", activity: "Dinner and cultural performance", type: "food" },
        ]
      }
    ],
    estimatedCost: budget === "budget" ? "₹10,000" : budget === "midrange" ? "₹20,000" : "₹40,000",
    accommodationSuggestions: [
      { name: "Comfortable Stay", type: budget === "budget" ? "Hostel" : budget === "midrange" ? "3-Star Hotel" : "5-Star Resort", priceRange: budget === "budget" ? "₹1,000-₹2,000/night" : budget === "midrange" ? "₹3,000-₹5,000/night" : "₹8,000+/night" },
      { name: "City Center Lodge", type: budget === "budget" ? "Guesthouse" : budget === "midrange" ? "Boutique Hotel" : "Luxury Hotel", priceRange: budget === "budget" ? "₹1,200-₹2,200/night" : budget === "midrange" ? "₹3,500-₹6,000/night" : "₹10,000+/night" }
    ],
    foodRecommendations: [
      { name: "Local Delights Restaurant", cuisine: "Traditional", budget: budget === "budget" ? "₹" : budget === "midrange" ? "₹₹" : "₹₹₹" },
      { name: "Spice Garden", cuisine: "Indian Fusion", budget: budget === "budget" ? "₹" : budget === "midrange" ? "₹₹" : "₹₹₹" },
      { name: "Street Food Corner", cuisine: "Street Food", budget: "₹" }
    ],
    transportOptions: [
      { type: "Local Bus", cost: "₹20 per ride" },
      { type: "Auto Rickshaw", cost: "₹100-₹200 per trip" },
      { type: "Taxi", cost: "₹300+ per trip" },
      { type: "Car Rental", cost: "₹1,500+ per day" }
    ]
  };

  if (destination === "mumbai" && tripType === "heritage") {
    itinerary = {
      title: "Mumbai Heritage Explorer",
      description: "Discover Mumbai's colonial architecture and historical landmarks that tell the story of India's journey.",
      days: [
        {
          day: 1,
          activities: [
            { time: "08:00 AM", activity: "Breakfast at Leopold Cafe", type: "food" },
            { time: "10:00 AM", activity: "Gateway of India and boat ride to Elephanta Caves", type: "sight" },
            { time: "01:30 PM", activity: "Lunch at Cafe Mondegar", type: "food" },
            { time: "03:00 PM", activity: "Visit Chhatrapati Shivaji Terminus (CST)", type: "sight" },
            { time: "05:00 PM", activity: "Evening walk at Marine Drive", type: "activity" },
            { time: "07:30 PM", activity: "Dinner at Trishna for seafood", type: "food" },
          ]
        },
        {
          day: 2,
          activities: [
            { time: "08:30 AM", activity: "Breakfast at Britannia & Co.", type: "food" },
            { time: "10:00 AM", activity: "Visit Dr. Bhau Daji Lad Museum", type: "sight" },
            { time: "12:30 PM", activity: "Lunch at Delhi Darbar", type: "food" },
            { time: "02:00 PM", activity: "Tour of Kala Ghoda Art District", type: "activity" },
            { time: "04:30 PM", activity: "Visit Mani Bhavan (Gandhi's residence)", type: "sight" },
            { time: "07:00 PM", activity: "Dinner at Khyber Restaurant", type: "food" },
          ]
        },
        {
          day: 3,
          activities: [
            { time: "09:00 AM", activity: "Breakfast at Cafe Madras", type: "food" },
            { time: "10:30 AM", activity: "Visit Banganga Tank", type: "sight" },
            { time: "01:00 PM", activity: "Lunch at Shree Thaker Bhojanalay", type: "food" },
            { time: "03:00 PM", activity: "Explore Worli Fort", type: "sight" },
            { time: "05:30 PM", activity: "Sunset at Bandra Fort", type: "activity" },
            { time: "08:00 PM", activity: "Dinner at Punjab Grill", type: "food" },
          ]
        }
      ],
      estimatedCost: budget === "budget" ? "₹12,000" : budget === "midrange" ? "₹25,000" : "₹45,000",
      accommodationSuggestions: [
        { name: budget === "budget" ? "Backpacker Panda" : budget === "midrange" ? "Fariyas Hotel" : "The Taj Mahal Palace", type: budget === "budget" ? "Hostel" : budget === "midrange" ? "4-Star Hotel" : "5-Star Heritage Hotel", priceRange: budget === "budget" ? "₹1,000-₹2,000/night" : budget === "midrange" ? "₹4,000-₹7,000/night" : "₹15,000+/night" },
        { name: budget === "budget" ? "Bombay Backpackers" : budget === "midrange" ? "The Gordon House" : "The Oberoi Mumbai", type: budget === "budget" ? "Hostel" : budget === "midrange" ? "Boutique Hotel" : "Luxury Hotel", priceRange: budget === "budget" ? "₹800-₹1,500/night" : budget === "midrange" ? "₹5,000-₹8,000/night" : "₹18,000+/night" }
      ],
      foodRecommendations: [
        { name: "Leopold Cafe", cuisine: "Continental/Indian", budget: "₹₹" },
        { name: "Britannia & Co.", cuisine: "Parsi", budget: "₹₹" },
        { name: "Bademiya", cuisine: "Mughlai Street Food", budget: "₹" },
        { name: "Trishna", cuisine: "Seafood", budget: "₹₹₹" },
        { name: "Delhi Darbar", cuisine: "North Indian", budget: "₹₹" }
      ],
      transportOptions: [
        { type: "Local Train", cost: "₹10-₹20 per ride" },
        { type: "BEST Bus", cost: "₹10-₹40 per ride" },
        { type: "Auto Rickshaw", cost: "₹100-₹250 per trip" },
        { type: "Taxi", cost: "₹300+ per trip" },
        { type: "Uber/Ola", cost: "₹200+ per trip" }
      ]
    };
  } else if (destination === "pune" && tripType === "food") {
    itinerary = {
      title: "Pune Food Trail Adventure",
      description: "Experience the culinary delights of Pune with this food-focused itinerary.",
      days: [
        {
          day: 1,
          activities: [
            { time: "08:00 AM", activity: "Start with Misal Pav at Bedekar", type: "food" },
            { time: "10:00 AM", activity: "Visit Shaniwar Wada", type: "sight" },
            { time: "12:30 PM", activity: "Lunch at Shreyas for Maharashtrian Thali", type: "food" },
            { time: "03:00 PM", activity: "Tea and snacks at Goodluck Cafe", type: "food" },
            { time: "05:00 PM", activity: "Evening walk at Koregaon Park", type: "activity" },
            { time: "07:30 PM", activity: "Dinner at Malaka Spice", type: "food" },
          ]
        },
        {
          day: 2,
          activities: [
            { time: "07:30 AM", activity: "Breakfast at Vaishali for Dosa", type: "food" },
            { time: "09:30 AM", activity: "Visit Aga Khan Palace", type: "sight" },
            { time: "12:00 PM", activity: "Lunch at Purepur Kolhapur", type: "food" },
            { time: "02:30 PM", activity: "Sweet treats at Kayani Bakery", type: "food" },
            { time: "04:00 PM", activity: "Food walk in Camp Area", type: "activity" },
            { time: "07:00 PM", activity: "Dinner at German Bakery", type: "food" },
          ]
        }
      ],
      estimatedCost: budget === "budget" ? "₹8,000" : budget === "midrange" ? "₹18,000" : "₹35,000",
      accommodationSuggestions: [
        { name: budget === "budget" ? "Zostel Pune" : budget === "midrange" ? "Lemon Tree Hotel" : "JW Marriott Hotel", type: budget === "budget" ? "Hostel" : budget === "midrange" ? "4-Star Hotel" : "5-Star Hotel", priceRange: budget === "budget" ? "₹800-₹1,500/night" : budget === "midrange" ? "₹3,500-₹6,000/night" : "₹12,000+/night" },
        { name: budget === "budget" ? "Le Pension" : budget === "midrange" ? "Novotel Pune" : "The Ritz-Carlton", type: budget === "budget" ? "Guest House" : budget === "midrange" ? "4-Star Hotel" : "5-Star Hotel", priceRange: budget === "budget" ? "₹1,000-₹2,000/night" : budget === "midrange" ? "₹4,000-₹7,000/night" : "₹15,000+/night" }
      ],
      foodRecommendations: [
        { name: "Vaishali", cuisine: "South Indian", budget: "₹" },
        { name: "Bedekar Tea Stall", cuisine: "Maharashtrian", budget: "₹" },
        { name: "Shreyas", cuisine: "Maharashtrian Thali", budget: "₹₹" },
        { name: "Malaka Spice", cuisine: "Pan-Asian", budget: "₹₹₹" },
        { name: "German Bakery", cuisine: "Continental/Fusion", budget: "₹₹" }
      ],
      transportOptions: [
        { type: "City Bus", cost: "₹15-₹30 per ride" },
        { type: "Auto Rickshaw", cost: "₹100-₹200 per trip" },
        { type: "Taxi", cost: "₹250+ per trip" },
        { type: "Uber/Ola", cost: "₹150+ per trip" },
        { type: "Bicycle Rental", cost: "₹100-₹200 per day" }
      ]
    };
  }

  const days = parseInt(duration);
  if (days > 0 && days < itinerary.days.length) {
    itinerary.days = itinerary.days.slice(0, days);
  } else if (days > itinerary.days.length) {
    for (let i = itinerary.days.length + 1; i <= days; i++) {
      itinerary.days.push({
        day: i,
        activities: [
          { time: "08:30 AM", activity: "Breakfast at local cafe", type: "food" },
          { time: "10:00 AM", activity: "Visit local attraction", type: "sight" },
          { time: "01:00 PM", activity: "Lunch at recommended restaurant", type: "food" },
          { time: "03:00 PM", activity: "Explore the area", type: "activity" },
          { time: "07:00 PM", activity: "Dinner at popular spot", type: "food" },
        ]
      });
    }
  }

  return itinerary;
};

type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AUD';
type ExchangeRates = {
  [key in CurrencyCode]: {
    [key in CurrencyCode]?: number;
  };
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("INR");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("USD");
  const [result, setResult] = useState<string>("");
  
  const exchangeRates: ExchangeRates = {
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, AUD: 0.018 },
    USD: { INR: 83.26, EUR: 0.92, GBP: 0.79, AUD: 1.52 },
    EUR: { INR: 90.57, USD: 1.09, GBP: 0.86, AUD: 1.65 },
    GBP: { INR: 105.56, USD: 1.27, EUR: 1.17, AUD: 1.93 },
    AUD: { INR: 54.66, USD: 0.66, EUR: 0.61, GBP: 0.52 }
  };

  const convert = () => {
    if (fromCurrency && toCurrency && amount) {
      const numAmount = parseFloat(amount);
      const rate = exchangeRates[fromCurrency][toCurrency];
      if (rate !== undefined) {
        const calculated = (numAmount * rate).toFixed(2);
        setResult(`${numAmount} ${fromCurrency} = ${calculated} ${toCurrency}`);
      } else {
        setResult(`Conversion rate not available`);
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Currency Converter</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <Input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <Select value={fromCurrency} onValueChange={(val: string) => setFromCurrency(val as CurrencyCode)}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <Select value={toCurrency} onValueChange={(val: string) => setToCurrency(val as CurrencyCode)}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={convert} className="w-full bg-heritage-terracotta">
          <Calculator className="mr-2 h-4 w-4" />
          Convert
        </Button>
        
        {result && (
          <div className="bg-heritage-cream/50 p-3 rounded-md text-center font-medium">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

const BudgetTracker = () => {
  const [budget, setBudget] = useState<string>("");
  const [expenses, setExpenses] = useState<{category: string, amount: number, description: string}[]>([
    {category: "accommodation", amount: 5000, description: "Hotel deposit"},
    {category: "food", amount: 2000, description: "Restaurant meals"},
    {category: "transport", amount: 1500, description: "Train tickets"}
  ]);
  const [newExpense, setNewExpense] = useState<{category: string, amount: string, description: string}>({
    category: "accommodation", 
    amount: "", 
    description: ""
  });
  
  const addExpense = () => {
    if (newExpense.amount && newExpense.description) {
      setExpenses([...expenses, {
        ...newExpense, 
        amount: parseFloat(newExpense.amount)
      }]);
      setNewExpense({category: "accommodation", amount: "", description: ""});
    }
  };
  
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = budget ? parseFloat(budget) - totalExpenses : 0;
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Budget Tracker</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Total Budget (₹)</label>
          <Input 
            type="number" 
            value={budget} 
            onChange={(e) => setBudget(e.target.value)}
            className="w-full"
            placeholder="Enter your total trip budget"
          />
        </div>
        
        {budget && (
          <div className="grid grid-cols-2 gap-4 bg-heritage-cream/50 p-3 rounded-md">
            <div className="text-center">
              <p className="text-sm text-heritage-gray">Spent</p>
              <p className="text-lg font-bold text-heritage-terracotta">
                ₹{totalExpenses.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-heritage-gray">Remaining</p>
              <p className={`text-lg font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-green-turf'}`}>
                ₹{remainingBudget.toLocaleString()}
              </p>
            </div>
          </div>
        )}
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Add Expense</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Select value={newExpense.category} onValueChange={(val) => setNewExpense({...newExpense, category: val})}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accommodation">Accommodation</SelectItem>
                <SelectItem value="food">Food & Drinks</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="activities">Activities</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Input 
              type="number" 
              placeholder="Amount" 
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            />
            
            <Input 
              placeholder="Description" 
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            />
          </div>
          
          <Button onClick={addExpense} className="mt-3 w-full">
            Add Expense
          </Button>
        </div>
        
        {expenses.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Your Expenses</h4>
            <div className="max-h-40 overflow-y-auto">
              {expenses.map((expense, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-xs text-heritage-gray capitalize">{expense.category}</p>
                  </div>
                  <p className="font-medium">₹{expense.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PlanTrip = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  //const [tripType, setTripType] = useState("heritage");
  const [tripTypes, setTripTypes] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState("");
  const [travelDate, setTravelDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mood, setMood] = useState("");
  const [showMoodPlanner, setShowMoodPlanner] = useState(false);
  const [customBudget, setCustomBudget] = useState<string>("");
  const [showItinerary, setShowItinerary] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const [showTools, setShowTools] = useState(false);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!destination || !tripDuration) {
  //     toast({
  //       title: "Missing information",
  //       description: "Please select a destination and trip duration",
  //       variant: "destructive"
  //     });
  //     return;
  //   }
    
  //   setIsSubmitting(true);
    
  //   setTimeout(() => {
  //     const itinerary = getCustomizedItinerary(destination.toLowerCase(), tripType, tripDuration, budgetRange);
  //     setGeneratedItinerary(itinerary);
  //     setShowItinerary(true);
  //     setIsSubmitting(false);
  //   }, 1500);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !tripDuration || tripTypes.length === 0) {
      toast({
        title: "Missing information",
        description: "Please select a destination, duration and trip types",
        variant: "destructive"
      });
      return;
    }
  
    setIsSubmitting(true);
    const itinerary = await fetchItineraryFromAPI(destination.toLowerCase(), tripTypes, tripDuration, budgetRange, mood);
    setGeneratedItinerary(itinerary);
    setShowItinerary(true);
    setIsSubmitting(false);
  };
  

  const handleMoodSubmit = async () => {
    if (!mood || !customBudget) {
      toast({
        title: "Missing information",
        description: "Please select your mood and enter a budget",
        variant: "destructive"
      });
      return;
    }
  
    const moodDestination = mood === "adventurous" ? "pune" :
                            mood === "relaxed" ? "nagpur" :
                            mood === "cultural" ? "mumbai" :
                            mood === "romantic" ? "nashik" : "mumbai";
  
    const moodTripTypes = mood === "adventurous" ? ["adventure"] :
                          mood === "relaxed" ? ["nature"] :
                          mood === "cultural" ? ["heritage"] :
                          mood === "romantic" ? ["spiritual"] :
                          mood === "foodie" ? ["food"] : ["heritage"];
  
    const moodBudget = parseInt(customBudget) < 15000 ? "budget" :
                       parseInt(customBudget) < 30000 ? "midrange" : "luxury";
  
    setIsSubmitting(true);
    const itinerary = await fetchItineraryFromAPI(moodDestination, moodTripTypes, "3", moodBudget, mood);
    setGeneratedItinerary(itinerary);
    setShowItinerary(true);
    setShowMoodPlanner(false);
    setIsSubmitting(false);
  
    setDestination(moodDestination);
    setTripTypes(moodTripTypes);
    setTripDuration("3");
    setBudgetRange(moodBudget);
  };
  

  // const handleMoodSubmit = () => {
  //   if (!mood || !customBudget) {
  //     toast({
  //       title: "Missing information",
  //       description: "Please select your mood and enter a budget",
  //       variant: "destructive"
  //     });
  //     return;
  //   }
    
  //   setIsSubmitting(true);
    
  //   const moodDestination = mood === "adventurous" ? "pune" : 
  //                          mood === "relaxed" ? "nagpur" : 
  //                          mood === "cultural" ? "mumbai" : 
  //                          mood === "romantic" ? "nashik" : "mumbai";
    
  //   const moodType = mood === "adventurous" ? "adventure" : 
  //                   mood === "relaxed" ? "nature" : 
  //                   mood === "cultural" ? "heritage" : 
  //                   mood === "romantic" ? "spiritual" : 
  //                   mood === "foodie" ? "food" : "heritage";
    
  //   const moodBudget = parseInt(customBudget) < 15000 ? "budget" : 
  //                      parseInt(customBudget) < 30000 ? "midrange" : "luxury";
    
  //   const itinerary = getCustomizedItinerary(moodDestination, moodType, "3", moodBudget);
  //   setGeneratedItinerary(itinerary);
  //   setShowItinerary(true);
  //   setShowMoodPlanner(false);
  //   setIsSubmitting(false);
    
  //   setDestination(moodDestination);
  //   setTripType(moodType);
  //   setTripDuration("3");
  //   setBudgetRange(moodBudget);
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="relative py-16 bg-gradient-to-br from-heritage-cream to-heritage-mustard/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-green-turf mb-2">Tell us your mood & budget</h2>
                <p className="text-heritage-gray">Let us curate the perfect experience based on your preferences</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">How are you feeling?</label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your mood" />
                    </SelectTrigger>
                    <SelectContent>
                      {MoodOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Budget (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-green-turf h-4 w-4" />
                    <Input 
                      type="number" 
                      placeholder="Enter your budget"
                      className="pl-10" 
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleMoodSubmit}
                  className="bg-green-turf hover:bg-green-turf/90"
                  disabled={isSubmitting}
                >
                  <Star className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Creating Your Plan..." : "Get Personalized Recommendations"}
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-heritage-dark mb-4">
                  Plan Your Maharashtra Heritage Trail
                </h1>
                <p className="text-heritage-gray">
                  Create a personalized itinerary based on your preferences and discover the best heritage sites, dining options, and experiences.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Starting Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-heritage-terracotta h-4 w-4" />
                      <Input 
                        type="text" 
                        placeholder="Enter your starting point"
                        className="pl-10" 
                        required
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destination City</label>
                    <Select value={destination} onValueChange={setDestination} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city.toLowerCase()}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Trip Duration</label>
                    <Select value={tripDuration} onValueChange={setTripDuration} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {TripDurationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Travel Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={"w-full justify-start text-left font-normal"}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {travelDate ? format(travelDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={travelDate}
                          onSelect={setTravelDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    {/* <label className="text-sm font-medium">Trip Type</label>
                    <Select value={tripType} onValueChange={setTripType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                      <SelectContent>
                        {TripTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select> */}
                    <label className="text-sm font-medium">Trip Types</label>
<div className="flex flex-wrap gap-2">
  {TripTypeOptions.map(option => (
    <button
      key={option.value}
      type="button"
      className={`px-3 py-1 rounded-full border ${
        tripTypes.includes(option.value)
          ? "bg-green-turf text-white"
          : "bg-white text-heritage-dark border-gray-300"
      }`}
      onClick={() => {
        setTripTypes(prev =>
          prev.includes(option.value)
            ? prev.filter(t => t !== option.value)
            : [...prev, option.value]
        );
      }}
    >
      {option.label}
    </button>
  ))}
</div>

                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Budget Range</label>
                    <Select value={budgetRange} onValueChange={setBudgetRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {BudgetOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button type="submit" className="bg-heritage-terracotta hover:bg-heritage-terracotta/90" size="lg" disabled={isSubmitting}>
                    <Plane className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Creating Your Itinerary..." : "Generate Itinerary"}
                  </Button>
                </div>
              </form>
            </div>

            <div className="mt-8">
              <Button
                onClick={() => setShowTools(!showTools)}
                variant="outline"
                className="w-full mb-4"
              >
                {showTools ? "Hide Travel Tools" : "Show Travel Tools"}
              </Button>

              {showTools && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CurrencyConverter />
                  <BudgetTracker />
                </div>
              )}
            </div>

            {showItinerary && generatedItinerary && (
              <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 mt-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-heritage-dark mb-2">{generatedItinerary.title}</h2>
                  <p className="text-heritage-gray">{generatedItinerary.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-heritage-terracotta" /> 
                    Daily Itinerary
                  </h3>
                  <div className="space-y-8">
                    {generatedItinerary.days.map((day: any, index: number) => (
                      <div key={index} className="border-l-2 border-heritage-terracotta pl-4 pb-2">
                        <h4 className="font-bold text-lg mb-3">Day {day.day}</h4>
                        <div className="space-y-4">
                          {day.activities.map((activity: any, actIndex: number) => (
                            <div key={actIndex} className="flex">
                              <div className="w-24 font-medium text-heritage-terracotta">{activity.time}</div>
                              <div className="flex-1">
                                <p>{activity.activity}</p>
                                <span className="text-xs px-2 py-1 inline-block rounded-full bg-heritage-cream text-heritage-dark mt-1">
                                  {activity.type === "food" ? "Dining" : 
                                    activity.type === "sight" ? "Sightseeing" : "Activity"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-heritage-cream/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <IndianRupee className="mr-2 h-4 w-4 text-heritage-terracotta" />
                      Estimated Cost
                    </h4>
                    <p className="text-xl font-bold">{generatedItinerary.estimatedCost}</p>
                  </div>
                  
                  <div className="bg-heritage-cream/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Landmark className="mr-2 h-4 w-4 text-heritage-terracotta" />
                      Accommodation
                    </h4>
                    <ul className="text-sm space-y-2">
                      {generatedItinerary.accommodationSuggestions.map((acc: any, index: number) => (
                        <li key={index}>
                          <p className="font-medium">{acc.name}</p>
                          <p className="text-xs">{acc.type} · {acc.priceRange}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-heritage-cream/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Utensils className="mr-2 h-4 w-4 text-heritage-terracotta" />
                      Food Recommendations
                    </h4>
                    <ul className="text-sm space-y-2">
                      {generatedItinerary.foodRecommendations.slice(0, 3).map((food: any, index: number) => (
                        <li key={index} className="flex justify-between">
                          <span>{food.name}</span>
                          <span className="text-heritage-terracotta">{food.budget}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-heritage-cream/30 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-3">Transportation Options</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {generatedItinerary.transportOptions.map((transport: any, index: number) => (
                      <div key={index} className="text-center p-3 bg-white rounded-md shadow-sm">
                        <p className="font-medium">{transport.type}</p>
                        <p className="text-xs text-heritage-gray">{transport.cost}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Button className="bg-green-turf hover:bg-green-turf/90">
                    <Camera className="mr-2 h-4 w-4" />
                    Save Itinerary
                  </Button>
                  <p className="text-xs text-heritage-gray mt-2">
                    You can modify this itinerary further based on your preferences
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlanTrip;
