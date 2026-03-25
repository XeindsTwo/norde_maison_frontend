import React from 'react';
import ReactSlider from 'react-slider';
import ArrowLeft from '@/assets/images/size-quiz/arrow-left.svg';
import ArrowRight from '@/assets/images/size-quiz/arrow-right.svg';
import SliderBtn from '@/assets/images/size-quiz/btn.svg';
import './FitSlider.scss';

const fitPresets = [
  {value: -2, label: 'ULTRA-SLIM'},
  {value: -1, label: 'SLIM'},
  {value: 0, label: 'NORMAL'},
  {value: 1, label: 'RELAXED'},
  {value: 2, label: 'OVERSIZE'},
];

const FitSlider = ({value, onChange}) => {
  const currentPreset =
    fitPresets.find((p) => p.value === value) || fitPresets[2];

  return (
    <div className="fit-slider">
      <div className="fit-slider__container">
        <ReactSlider
          className="fit-slider__slider"
          thumbClassName="fit-slider__thumb"
          trackClassName="fit-slider__track"
          min={-2}
          max={2}
          step={1}
          value={value}
          onChange={onChange}
          marks={[-2, -1, 0, 1, 2]}
          renderThumb={(props) => (
            <div {...props} className="fit-slider__thumb">
              <SliderBtn/>
              <div className="fit-slider__tag">
                {currentPreset.label}
              </div>
            </div>
          )}
          renderMark={(props) => (
            <span {...props} className="fit-slider__tick"/>
          )}
        />

        <div className="fit-slider__labels">
          <span><ArrowLeft/> ПЛОТНО</span>
          <span>Свободно <ArrowRight/></span>
        </div>
      </div>
    </div>
  );
};

export default FitSlider;