import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AutoCarousel from "@/components/AutoCarousel";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nameOrEmail: "",
    visitReason: "",
    password: "",
    confirmPassword: "",
  });

  const visitReasons = [
    { value: "employee", label: "Employee" },
    { value: "visitor", label: "Visitor" },
    { value: "supplier", label: "Supplier" },
    { value: "audit", label: "Audit" },
    { value: "safety", label: "Safety" },
  ];

  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80",
      alt: "Industrial depot operations",
    },
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc27?w=800&q=80",
      alt: "Safety and compliance",
    },
    {
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      alt: "Team collaboration",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date",
        variant: "destructive",
      });
      return;
    }

    if (!formData.visitReason) {
      toast({
        title: "Error",
        description: "Please select a reason for visit",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Registration successful! Redirecting to dashboard...",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/3 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to register for Depot Pulse Hub
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nameOrEmail">Name or Email</Label>
                <Input
                  id="nameOrEmail"
                  type="text"
                  placeholder="John Doe or john@example.com"
                  value={formData.nameOrEmail}
                  onChange={(e) => setFormData({ ...formData, nameOrEmail: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitReason">Reason for Visit</Label>
                <Select
                  value={formData.visitReason}
                  onValueChange={(value) => setFormData({ ...formData, visitReason: value })}
                >
                  <SelectTrigger id="visitReason">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {visitReasons.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value}>
                        {reason.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign Up
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto font-normal text-primary"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:block lg:w-2/3 bg-muted h-screen">
        <AutoCarousel images={carouselImages} autoplayInterval={5000} />
      </div>
    </div>
  );
};

export default SignUp;