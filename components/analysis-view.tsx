"use client";

import React, { useEffect, useState } from "react";
import { Analysis } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./ui/alert-dialog";
import { Progress } from "./ui/progress";
import { useAnalysis } from "@/context/analysis-context";
import { Button } from "./ui/button";
import { LucideSquareX } from "lucide-react";
import { usePathname } from "next/navigation";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  analysis: Analysis;
};

type Recommendation = {
  label_type: string;
  brand_name: string;
  price: number;
  reason: string;
  key_ingredients: string[];
};

const AnalysisView: React.FC<Props> = ({ analysis }) => {
  const { faces, skin_type, skin_age, skin_acne, skin_wrinkle } = analysis;
  const { setAnalysis } = useAnalysis();
  const [feedbackDone, setFeedbackState] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [showModal, setShowModal] = useState(false); // New state for modal visibility
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    setAnalysis(analysis);
  }, [analysis, setAnalysis]);

  const fetchRecommendations = async () => {
    if (fetched) {
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://quantum-backend-sxxx.onrender.com/get_recommendation/559/"
      );

      if (!response.ok) {
        throw new Error("Error fetching recommendations");
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
      setFetched(true);
      setShowModal(true);
    } catch (error) {
      toast({
        title: "Failed to fetch recommendations",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendFeedback = async () => {
    if (rating === null || !analysis) {
      toast({ title: "Please select a rating." });
      return;
    }

    const feedbackData = {
      analysis_id: analysis.analysis_id,
      rating,
      comment,
    };

    try {
      const response = await fetch(
        "https://quantum-backend-sxxx.onrender.com/feedback/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );

      if (!response.ok) {
        throw new Error("Error sending feedback");
      }
      toast({ title: "Thanks for your feedback!" });
      setFeedbackState(false);
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
    } catch (error) {
      toast({
        title: `Feedback sending failed`,
        description: "Try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <section>
      <div>
        <div className="flex items-center mb-2">
          {pathname === "/dashboard" && (
            <Button
              className="rounded-full"
              disabled={loading}
              onClick={fetchRecommendations}
            >
              {loading ? "Getting Recommendations..." : "Get Recommendations"}
            </Button>
          )}
          <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex items-center">
                  <AlertDialogTitle>Skin Condition: Acne</AlertDialogTitle>
                  <AlertDialogCancel className="border-none ms-auto hover:bg-transparent w-fit">
                    <LucideSquareX />
                  </AlertDialogCancel>
                </div>
                <AlertDialogDescription className="text-start">
                  Browse through recommended products below suited for customers
                  skin analysis
                </AlertDialogDescription>
              </AlertDialogHeader>
              {loading ? (
                <p>Loading recommendations...</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {recommendations.map((rec, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                      <AccordionTrigger className="text-sm text-start">
                        {rec.label_type}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div>
                          <p>
                            <strong>Brand:</strong> {rec.brand_name}
                          </p>
                          {/* <p>
                            <strong>Price:</strong> ${rec.price}
                          </p> */}
                          <p>
                            <strong>Reason:</strong> {rec.reason}
                          </p>
                          <p>
                            <strong>Key Ingredients:</strong>
                          </p>
                          <ul>
                            {rec.key_ingredients.map((ingredient, i) => (
                              <li key={i}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </AlertDialogContent>
          </AlertDialog>
          <p className="text-right ms-auto">Accuracy: {faces[0].accuracy}%</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Your Skin Age</AccordionTrigger>
            <AccordionContent>
              <span className="font-bold text-black">{skin_age[0]}</span> years
              old
              <p>{skin_age[2]}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Your Skin Tone</AccordionTrigger>
            <AccordionContent>
              <div
                className="text-black rounded-lg"
                style={{ backgroundColor: faces[0].skin_tone }}
              >
                <p className="p-2">{faces[0].skin_tone}</p>
                <hr />
                <p className="p-2">{faces[0].tone_label}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Your Skin Type</AccordionTrigger>
            <AccordionContent>
              <div>
                <p className="skin-type text-black">{skin_type[0]}</p>
                <Progress value={skin_type[1] * 100}>
                  {skin_type[1] * 100}%
                </Progress>
                <p>{skin_type[2]}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Your Skin Condition</AccordionTrigger>
            <AccordionContent>
              <div>
                <div>
                  <p className="text-black">Skin Acne : {skin_acne[0]} </p>
                  <Progress value={skin_acne[1] * 100} />
                  <p className="mt-2">{skin_acne[2]}</p>
                  <p className="mt-2 text-black">Aging : {skin_wrinkle[0]} </p>
                  <Progress value={skin_wrinkle[1] * 100} />
                </div>
                <p className="mt-2">{skin_wrinkle[2]}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {feedbackDone && pathname === "/" && (
        <div className="card feedback-section">
          <h3>Provide Your Feedback</h3>
          <div className="feedback">
            <Textarea
              onChange={(e) => setComment(e.target.value)}
              style={{
                height: "100px",
                backgroundColor: "white",
                color: "black",
              }}
              placeholder="Enter your comment here"
            ></Textarea>
            <div className="flex items-center my-4">
              <Select onValueChange={(value) => setRating(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rating</SelectLabel>
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <SelectItem key={rate} value={String(rate)}>
                        {rate}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button onClick={sendFeedback} className="ms-auto">Submit Feedback</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AnalysisView;
