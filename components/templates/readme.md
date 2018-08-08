## Templates definition from atomic
At the template stage, we break our chemistry analogy to get into language that makes more sense to our clients and our final output.
Templates consist mostly of groups of organisms stitched together to form pages.
It’s here where we start to see the design coming together and start seeing things like layout in action..

### Templates Component Example


## ProfileLayout

Templates will be a concrete representation of page layout. Examples below shows different templates that could be reused as different page instances.

```javascript
import React from 'react';
import ProfileHeader from 'component/molecules/header'
import ProfileContent from 'component/molecules/content'
import ProfileComments from 'component/molecules/comments'

export CardHeroLayout = () => (
  <PageLayout classname='card-hero-layout'>
    <ProfileHeader/>
    <ProfileContent/>
    <ProfileComments/>
  </div>
);
```
