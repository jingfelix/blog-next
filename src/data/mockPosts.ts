import { BlogPost } from '../types/blog';

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Minimalist Design',
    excerpt: 'Exploring how less can truly be more when it comes to creating meaningful and impactful design experiences.',
    content: `
      <p>Minimalist design has become more than just a trend—it's a philosophy that emphasizes the importance of simplicity and intentionality in our increasingly complex digital world.</p>
      
      <p>At its core, minimalist design is about removing the unnecessary to highlight what truly matters. This approach doesn't mean creating sparse or empty interfaces, but rather being deliberate about every element that remains.</p>
      
      <h3>The Principles of Minimalist Design</h3>
      
      <p>The foundation of minimalist design rests on several key principles:</p>
      
      <p><strong>Clarity of Purpose:</strong> Every element should serve a specific function and contribute to the overall user experience. If an element doesn't add value, it should be removed.</p>
      
      <p><strong>Whitespace as a Design Element:</strong> Negative space isn't empty space—it's an active component that helps guide the user's attention and creates breathing room for content.</p>
      
      <p><strong>Typography Hierarchy:</strong> With fewer visual elements competing for attention, typography becomes crucial for establishing information hierarchy and guiding users through content.</p>
      
      <h3>Implementation in Digital Products</h3>
      
      <p>When applying minimalist principles to digital products, consider the user's journey and cognitive load. Each screen should present only the information and actions necessary for the current task.</p>
      
      <p>Color palettes should be restrained but purposeful. A limited color scheme can actually enhance usability by creating stronger associations between colors and actions or states.</p>
      
      <p>The result is not just aesthetically pleasing—it's functionally superior, creating products that are easier to use, understand, and maintain.</p>
    `,
    author: 'Sarah Chen',
    publishedDate: 'January 15, 2025',
    readTime: '5 min read',
    tags: ['Design', 'Minimalism', 'UX'],
    imageUrl: 'https://images.unsplash.com/photo-1587522384446-64daf3e2689a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwZGVza3xlbnwxfHx8fDE3NTgxMTg2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '2',
    title: 'Modern Architecture and Digital Spaces',
    excerpt: 'How architectural principles from the physical world can inform and improve our digital design practices.',
    content: `
      <p>The relationship between architecture and digital design runs deeper than surface-level aesthetics. Both disciplines shape how people interact with spaces—whether physical or virtual.</p>
      
      <p>Architects have spent centuries understanding how people move through and experience spaces. These same principles can transform how we approach user interface design and digital product architecture.</p>
      
      <h3>Spatial Design Principles</h3>
      
      <p>Consider how buildings guide visitors through carefully designed pathways. Digital interfaces can use similar wayfinding principles to create intuitive navigation systems.</p>
      
      <p><strong>Flow and Movement:</strong> Just as architects design circulation patterns in buildings, UX designers must consider how users move through digital interfaces. Natural pathways should emerge from the layout itself.</p>
      
      <p><strong>Scale and Proportion:</strong> Architectural concepts of human scale translate directly to interface design. Elements should feel proportional to the user's expectations and the device they're using.</p>
      
      <p><strong>Light and Shadow:</strong> While digital interfaces don't have natural light, the strategic use of depth, shadows, and layering can create hierarchy and visual interest without clutter.</p>
      
      <h3>Functional Beauty</h3>
      
      <p>The best architecture seamlessly blends form and function. Similarly, the most successful digital products don't sacrifice usability for aesthetic appeal—they enhance function through thoughtful design.</p>
      
      <p>This integration of beauty and utility creates experiences that are not only effective but also emotionally resonant, making users feel more connected to the digital spaces they inhabit.</p>
    `,
    author: 'Marcus Rodriguez',
    publishedDate: 'January 12, 2025',
    readTime: '7 min read',
    tags: ['Architecture', 'Digital Design', 'UX'],
    imageUrl: 'https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTgwMTU5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '3',
    title: 'The Ritual of Daily Creativity',
    excerpt: 'Small daily practices that can transform your creative process and help you maintain consistent output.',
    content: `
      <p>Creativity isn't magic—it's a practice. The most successful creative professionals understand that inspiration comes through action, not the other way around.</p>
      
      <p>Building a sustainable creative practice requires intention, consistency, and the willingness to show up even when inspiration feels absent.</p>
      
      <h3>Creating Your Creative Ritual</h3>
      
      <p>The power of ritual lies in its ability to signal to your brain that it's time to enter a creative state. This could be as simple as brewing your morning coffee in a specific way or arranging your workspace just so.</p>
      
      <p><strong>Morning Pages:</strong> Start each day with three pages of stream-of-consciousness writing. This practice, popularized by Julia Cameron, helps clear mental clutter and often reveals unexpected insights.</p>
      
      <p><strong>Constraint as Liberation:</strong> Impose artificial limitations on your work. Limited color palettes, time constraints, or specific tools can paradoxically lead to more innovative solutions.</p>
      
      <p><strong>Observation Practice:</strong> Spend time each day really looking at the world around you. Notice how light falls on surfaces, how people interact with objects, how typography appears in unexpected places.</p>
      
      <h3>Consistency Over Perfection</h3>
      
      <p>The goal isn't to create a masterpiece every day—it's to maintain the creative momentum that leads to breakthrough moments. Some days will produce work you love, others will feel like pure practice. Both are necessary.</p>
      
      <p>Document your process, not just your results. The insights you gain from observing your own creative patterns are often more valuable than any individual piece of work.</p>
      
      <p>Remember: creativity is not a finite resource. The more you use it, the more abundant it becomes.</p>
    `,
    author: 'Elena Vasquez',
    publishedDate: 'January 10, 2025',
    readTime: '6 min read',
    tags: ['Creativity', 'Productivity', 'Process'],
    imageUrl: 'https://images.unsplash.com/photo-1622240506921-042a4e71c172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBtaW5pbWFsfGVufDF8fHx8MTc1ODExNjI4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];