const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
  // Basic file information
  filename: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true
  },
  
  // Additional metadata
  originalName: {
    type: String,
    trim: true
  },
  mimeType: {
    type: String,
    trim: true
  },
  size: {
    type: Number,
    default: 0
  },
  
  // Enhancement information
  enhancementType: {
    type: String,
    enum: ['background-blur', 'background-enhancer', 'face-retouch', 'face-enhancer', 'unblur', 'sharpener', 'none'],
    default: 'none'
  },
  
  // URLs for access
  url: {
    type: String,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true
  },
  
  // Metadata
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

imageSchema.virtual('fullUrl').get(function() {
  return `/uploads/${this.filename}`;
});

// Method to get image details
imageSchema.methods.getDetails = function() {
  return {
    id: this._id,
    filename: this.filename,
    originalName: this.originalName,
    url: this.url || this.fullUrl,
    size: this.size,
    enhancementType: this.enhancementType,
    createdAt: this.createdAt
  };
};

imageSchema.statics.findByEnhancementType = function(type) {
  return this.find({ enhancementType: type });
};

imageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the model
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;