# artsecosystem
Project using Timeline JS, JSON, Javascript(jQuery), CSS(Bootstrap) and HTML

Step 1 Add Timeline CSS CDN:

```
<link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css">
```

Step 2 Add Timeline JS CDN:

```
<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>
```
Step 3 Create a div for the Timeline:

```
<div id="timeline-embed"></div>
```

Step 4  Timeline Fetch JSON data: 
    
```
<script type="text/javascript">
$(document).ready(function() {
if ($('#timeline-embed').length > 0) {
fetch('AERP.json')
.then(response => response.json())
window.timeline = new TL.Timeline('timeline-embed', 'AERP.json');
}});
</script>
```
