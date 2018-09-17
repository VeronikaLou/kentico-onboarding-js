import { Record } from 'immutable';

export const BaseRecord = <TObject>(defaultValues: TObject, name: string) =>
  class extends Record(defaultValues, name) {
    constructor(params: Partial<TObject> = defaultValues) {
      params ? super(params) : super();
    }

    with(values: Partial<TObject>): this {
      return this.merge(values) as any;
    }
  };
