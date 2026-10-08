  export class SegmentedControl {
    element;
    onSelectSegment;
    _segments;
    _selectedSegmentIndex = 0;

    constructor(element) {
      this.element = element;
      this._addEventListener();
    }

    setSegments(segments) {
      this._segments = segments;
      this._render();
    }

    setSelectedSegmentIndex(index){
      this._selectedSegmentIndex = index;
      this._render();
    }

    _render() {
      const segmentElements = this._segments.map((segment, index)=>{
        return this._buildSegmentElement(
          segment,
          index === this._selectedSegmentIndex
        );
      });
      this.element.replaceChildren(...segmentElements);
    }

    _addEventListener(){
      this.element.addEventListener('click', (event)=>{
        
        if (event.target === this.element) {
          return;
        }

        const index = Array.from(this.element.children).indexOf(event.target);
        
        this.onSelectSegment(index);
      });
    }

    _buildSegmentElement(segment, isSelected) {
      const segmentElement = document.createElement('button');
      segmentElement.classList.add('segmented-control__segment');

      if (isSelected) {
        segmentElement.classList.add('segmented-control__segment--selected')
      }
      segmentElement.textContent = segment;

      return segmentElement;
    }
  }