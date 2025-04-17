
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Wallet, Calendar, KeyRound, BookOpen, Library, Users, Rocket } from "lucide-react";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  
  // Parse plan data from URL state or use default
  const planData = location.state?.plan || {
    name: "Standard Plan",
    price: 99.99,
    students: 50,
    storage: "5GB",
    description: "Ideal for most educators and small classes",
    period: "12"
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Payment successful!",
        description: `You have successfully subscribed to ${planData.name}.`,
      });
      setIsLoading(false);
      navigate("/dashboard/courses");
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-primary">ShekhaLagbe</h1>
        <p className="text-muted-foreground">Complete your subscription</p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main checkout form */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base uppercase text-gray-500">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Full Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="p-6 text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country" className="text-base uppercase text-gray-500">Country</Label>
                <Select onValueChange={setCountry}>
                  <SelectTrigger id="country" className="p-6 text-lg">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="bd">Bangladesh</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment methods</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                defaultValue={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className={`flex flex-col space-y-4 border rounded-lg p-4 ${paymentMethod === 'card' ? 'border-primary' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center text-lg font-medium">
                      <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                      Card
                    </Label>
                    <div className="ml-auto flex space-x-2">
                      <img src="/lovable-uploads/b1bca833-473e-4bdf-9a63-c305c70d36ec.png" alt="Card Types" className="h-8" />
                    </div>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input 
                          id="card-number" 
                          placeholder="1234 5678 9012 3456" 
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiration Date</Label>
                          <Input 
                            id="expiry" 
                            placeholder="MM / YY" 
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">Security Code</Label>
                          <div className="relative">
                            <Input 
                              id="cvv" 
                              placeholder="CVC" 
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              maxLength={4}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-200 text-xs">
                              CVV
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 pt-2">
                        By providing your card information, you allow ShekhaLagbe to charge your card for future payments in accordance with their terms.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className={`flex items-center space-x-2 border rounded-lg p-4 ${paymentMethod === 'paypal' ? 'border-primary' : 'border-gray-200'}`}>
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center text-lg font-medium">
                    <Wallet className="h-5 w-5 mr-2 text-blue-600" />
                    Paypal
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700" 
                onClick={handleCheckout} 
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Start Free Trial"}
              </Button>
              <p className="text-center text-gray-500">You won't be charged today</p>
              <p className="text-xs text-center text-gray-500">
                I agree to the <span className="text-blue-600">Terms of Use</span>, <span className="text-blue-600">Refund Policy</span>, and <span className="text-blue-600">Privacy Policy</span>.
              </p>
            </CardFooter>
          </Card>
        </div>
        
        {/* Order summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold mr-3">PLUS</div>
                <CardTitle className="text-xl">{planData.name} Subscription</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Includes access to premium courses, projects, and certificates for {planData.students} students with {planData.storage} storage.
                </p>
                
                <div className="border-t border-b py-4 my-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>No commitment. Cancel anytime.</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Monthly subscription</span>
                    <span className="font-medium">7-Day Free Trial</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span></span>
                    <span>then ${planData.price}/mo</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Today's Total:</span>
                  <span>$0 USD</span>
                </div>
                
                <p className="text-sm text-gray-700 mt-4">
                  Your subscription begins today with a 7-day free trial. If you decide to stop during the trial period, visit My Purchases to cancel before April 25, 2025 and your card won't be charged. We can't issue refunds once your card is charged.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardContent className="flex justify-around py-6">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                <p className="text-2xl font-bold">10,000+</p>
                <p className="text-gray-500">Students</p>
              </div>
              <div className="text-center">
                <Library className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                <p className="text-2xl font-bold">500+</p>
                <p className="text-gray-500">Courses</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
