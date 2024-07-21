"use client";

import React, { useState } from "react";
import { Analysis } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "./ui/progress";

type Props = {
  analysis: Analysis;
  email: string;
  setEmail: (email: string) => void;
  sendAnalysisByEmail: () => void;
};

const AnalysisView: React.FC<Props> = ({
  analysis,
  email,
  setEmail,
  sendAnalysisByEmail,
}) => {
  const { faces, skin_type, skin_age, skin_acne, skin_wrinkle } = analysis;
  const dominantColors = faces[0].dominant_colors;
  const [feedbackDone, setFeedbackState] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const router = useRouter();
  const { toast } = useToast();

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

      // const data = await response.json();
      // console.log(data);
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
        <p className="text-right mb-4">Accuracy: {faces[0].accuracy}%</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Your Skin Age</AccordionTrigger>
            <AccordionContent>
              <span className="font-bold text-black">{skin_age[0]}</span> years
              old
              <p>
                As people age, it&apos;s natural to experience thinner, drier
                skin and an increase in wrinkles. However, your environment and
                lifestyle choices can sometimes cause your skin to age
                prematurely.
              </p>
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
          {/* <AccordionItem value="item-3">
            <AccordionTrigger>Dominant colors</AccordionTrigger>
            <AccordionContent>
              <div className="dominant-colors">
                {dominantColors.map((color, index) => (
                  <div
                    key={index}
                    className="text-lg text-white"
                    style={{ backgroundColor: color.color }}
                  >
                    <p className="text-white">{color.percent}%</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem> */}
          <AccordionItem value="item-4">
            <AccordionTrigger>Your Skin Type</AccordionTrigger>
            <AccordionContent>
              <div>
                <p className="skin-type text-black">{skin_type[0]}</p>
                <Progress value={skin_type[1] * 100}>
                  {skin_type[1] * 100}%
                </Progress>
                <p>
                  {skin_type[0]} skin feels like rough patches of your skin that
                  can flake or look scaly. If your skin is dry, it may or may
                  not be itchy (pruritis).
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Your Skin Condition</AccordionTrigger>
            <AccordionContent>
              <div>
                <div>
                  <p className="text-black">Skin Acne : {skin_acne[0]}{" "}</p>
                  <Progress value={skin_acne[1] * 100} />
                  <p className="mt-2 text-black">Skin Wrinkle : {skin_wrinkle[0]}{" "}</p>
                  <Progress value={skin_wrinkle[1] * 100} />
                </div>
                <p className="mt-4">
                  Your skin—the body&apos;s biggest organ—shields you from the
                  elements. However, you can sometimes still develop skin
                  conditions, or various problems with your skin.(eczema,
                  psoriasis, hives, and vitiligo)
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {feedbackDone && (
        <div className="card feedback-section hidden">
          <h3>Provide Your Feedback</h3>
          <div className="feedback">
            <textarea
              onChange={(e) => setComment(e.target.value)}
              style={{
                height: "100px",
                backgroundColor: "white",
                color: "black",
              }}
              placeholder="Enter your comment here"
            ></textarea>
            <label>
              Rating:
              <select
                value={rating ?? ""}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="" disabled>
                  Select rating
                </option>
                {[1, 2, 3, 4, 5].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </label>
            <button className="send-email" onClick={sendFeedback}>
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AnalysisView;
