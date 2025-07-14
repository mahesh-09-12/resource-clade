import mongoose from "mongoose";

const IntroVideoSchema = new mongoose.Schema({
  src: String,
  title: String,
  allow: String,
  referrerPolicy: String,
});

const ResourceSchema = new mongoose.Schema({
  res_type: String,
  title: String,
  res_description: String,
  res_url: {
    type: String,
    match: /^https?:\/\/.+/,
  },
});

const ProjectsSchema = new mongoose.Schema({
  type: String,
  name: String,
  description: String,
  url: {
    type: String,
    match: /^https?:\/\/.+/,
  },
  default: [],
});

const DomainSchema = new mongoose.Schema(
  {
    domain: String,
    domain_image: String,
    tags: [String],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    ratingSum: {
      type: Number,
      default: 0,
    },
    intro_video: IntroVideoSchema,
    description: String,
    resources: [ResourceSchema],
    projects: [ProjectsSchema],
  },
  { timestamps: true }
);

export const Resources = mongoose.model("Resources", DomainSchema);
