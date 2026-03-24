import * as Slider from '@radix-ui/react-slider';
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
  const currentPreset = fitPresets.find((p) => p.value === value) || fitPresets[2];
  const thumbPosition = ((value + 2) / 4) * 100;

  return (
    <div className="fit-slider">
      <div
        className="fit-slider__tag"
        style={{left: `calc(${thumbPosition}% - 35px)`}}
      >
        {currentPreset.label}
      </div>

      <div className="fit-slider__container">
        <Slider.Root
          className="fit-slider__slider"
          value={[value]}
          onValueChange={(v) => onChange(v[0])}
          min={-2}
          max={2}
          step={1}
        >
          <Slider.Track className="fit-slider__track">
            <Slider.Range className="fit-slider__range"/>
            <div className="fit-slider__ticks">
              <div className="fit-slider__tick"></div>
              <div className="fit-slider__tick"></div>
              <div className="fit-slider__tick"></div>
              <div className="fit-slider__tick"></div>
            </div>
          </Slider.Track>
          <Slider.Thumb className="fit-slider__thumb">
            <SliderBtn/>
          </Slider.Thumb>
        </Slider.Root>

        <div className="fit-slider__labels">
          <span><ArrowLeft/> ПЛОТНО</span>
          <span>Свободно <ArrowRight/></span>
        </div>
      </div>
    </div>
  );
};

export default FitSlider;