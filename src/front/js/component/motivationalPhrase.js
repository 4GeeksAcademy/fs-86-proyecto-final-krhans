import React from "react";

const Frases = () => {
  const frases = [
    "When you think you can't go any further, do one more rep.",
    "Positive self-talk can transform your performance.",
    "Success is not just physical, it's also mental and emotional.",
    "If you don't challenge your limits, you won't surpass them.",
    "The difference between possible and impossible lies in a person's determination.",
    "Mental strength will take you places where the body cannot.",
    "Pain is temporary, glory is eternal.",
    "You can't have a strong body with a weak mind.",
    "Today it hurts, tomorrow it will be easier.",
    "Don't give up, suffer now and live the rest of your life as a champion.",
    "It's not just what you do in the gym, but also how you manage your mind.",
    "Never doubt your potential, you are capable of great things.",
    "Every day is a new opportunity to improve.",
    "The body follows the mind, keep positive thoughts.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Champions keep playing until they get it right.",
    "Stress is the worst enemy of performance.",
    "A true athlete is not one who never fails, but one who never gives up.",
    "The best workout is the one that strengthens your mind as well.",
    "Don't wait for others to believe in you, start by believing in yourself.",
    "Train with purpose, compete with passion.",
    "The difficult gets done, the impossible is attempted.",
    "Don't be afraid to shine.",
    "Remember, failure is just a step towards success.",
    "Rest and relaxation are essential for performance.",
    "The body achieves what the mind believes.",
    "Success is the sum of small efforts repeated day after day.",
    "Don't count the days, make the days count.",
    "Change begins the moment you believe in yourself.",
    "Make every workout a personal victory.",
    "It's not always about winning, sometimes it's about learning.",
    "Success in anything always begins with discipline.",
    "Don't be afraid to ask for help, that too is strength.",
    "Don't underestimate yourself, you are more capable than you think.",
    "Don't wait to be motivated to start, start and motivation will come.",
    "There are no limits for those with determination.",
    "Don't punish yourself for a bad day, learn from it and move forward.",
    "You are capable of achieving more than you imagine.",
    "Results don't appear overnight, consistency is key.",
    "Rest is part of training.",
    "Don't let fear decide your future.",
    "Don't be afraid to fail, be afraid of not trying.",
    "Your emotional well-being is a priority, not a luxury.",
    "The best investment you can make is in yourself.",
    "Taking care of your mind is just as crucial as training your body.",
    "Self-confidence is the first step to success.",
    "If you don't push yourself to the limit, how will you know where it is?",
    "Your only limit is your mind.",
    "Mental well-being is just as important as physical well-being.",
    "The world needs what only you can offer.",
    "Today's sweat is tomorrow's victory.",
    "Mental health is the foundation of any lasting success.",
    "Confidence in yourself is the key to any achievement.",
    "Surround yourself with people who add to your well-being.",
    "The mind controls the body, learn to train it too.",
    "It’s never too late to be the best version of yourself.",
    "Your confidence is your best tool for success.",
    "Every step you take brings you closer to your goal.",
    "The balance between body and mind is the key to success.",
    "Your mind is a muscle, train it with positive thoughts.",
    "Believe in yourself and anything is possible.",
    "Every day is a new opportunity to be better.",
    "You are stronger than you think.",
    "Celebrate every small achievement, every step counts.",
    "Every workout counts, every rep brings you closer to your goal.",
    "Anxiety and pressure should not define you.",
    "If you fall seven times, get up eight.",
    "Success is the sum of small efforts repeated day after day.",
    "Don't compare your progress to others, every path is unique.",
    "Sometimes, resting is the best strategy for progress.",
    "Listen to your body and respect its timing.",
    "Trust the process and your ability to improve.",
    "Don't punish yourself, learn to listen to yourself.",
    "Disconnecting from time to time is just as important as training.",
    "Run when you can, walk when you need, but never stop.",
    "Every small step brings you closer to your best version.",
    "Talent wins games, but teamwork and intelligence win championships."
  ];

  const randomFrase = frases[Math.floor(Math.random() * frases.length)];

  return <p><b>{randomFrase}</b></p>;
};

export default Frases;
