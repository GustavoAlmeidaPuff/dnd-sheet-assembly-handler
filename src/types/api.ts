// Tipos para respostas da DND5EAPI

export interface APIResource {
  index: string;
  name: string;
  url: string;
}

export interface APIListResponse {
  count: number;
  results: APIResource[];
}

export interface AbilityBonus {
  ability_score: APIResource;
  bonus: number;
}

export interface Race {
  index: string;
  name: string;
  speed: number;
  ability_bonuses: AbilityBonus[];
  alignment: string;
  age: string;
  size: string;
  size_description: string;
  starting_proficiencies: APIResource[];
  starting_proficiency_options?: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        item: APIResource;
      }>;
    };
  };
  languages: APIResource[];
  language_desc: string;
  traits: APIResource[];
  subraces?: APIResource[];
}

export interface Class {
  index: string;
  name: string;
  hit_die: number;
  proficiency_choices: Array<{
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        item: APIResource;
      }>;
    };
  }>;
  proficiencies: APIResource[];
  saving_throws: APIResource[];
  starting_equipment: Array<{
    equipment: APIResource;
    quantity: number;
  }>;
  starting_equipment_options: Array<{
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      equipment_category?: {
        index: string;
        name: string;
        url: string;
      };
      options?: Array<{
        option_type: string;
        count?: number;
        of?: {
          option_set_type: string;
          equipment_category?: {
            index: string;
            name: string;
            url: string;
          };
        };
        item?: APIResource;
      }>;
    };
  }>;
  class_levels: string;
  multi_classing?: {
    prerequisites?: Array<{
      ability_score: APIResource;
      minimum_score: number;
    }>;
    proficiencies_gained?: APIResource[];
  };
  subclasses: APIResource[];
  spellcasting?: {
    level: number;
    spellcasting_ability: APIResource;
    info: Array<{
      name: string;
      desc: string[];
    }>;
  };
}

export interface Background {
  index: string;
  name: string;
  starting_proficiencies: APIResource[];
  language_options?: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        item: APIResource;
      }>;
    };
  };
  starting_equipment: Array<{
    equipment: APIResource;
    quantity: number;
  }>;
  starting_equipment_options?: Array<{
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        count?: number;
        of?: {
          option_set_type: string;
          equipment_category?: {
            index: string;
            name: string;
            url: string;
          };
        };
        item?: APIResource;
      }>;
    };
  }>;
  feature: {
    name: string;
    desc: string[];
  };
  personality_traits: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        string: string;
      }>;
    };
  };
  ideals: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        desc: string;
        alignments?: APIResource[];
      }>;
    };
  };
  bonds: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        string: string;
      }>;
    };
  };
  flaws: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        string: string;
      }>;
    };
  };
}

export interface Equipment {
  index: string;
  name: string;
  equipment_category: APIResource;
  gear_category?: APIResource;
  cost: {
    quantity: number;
    unit: string;
  };
  weight?: number;
  desc?: string[];
  armor_category?: string;
  armor_class?: {
    base: number;
    dex_bonus?: boolean;
    max_bonus?: number;
  };
  str_minimum?: number;
  stealth_disadvantage?: boolean;
  weapon_category?: string;
  weapon_range?: string;
  category_range?: string;
  damage?: {
    damage_dice: string;
    damage_type: APIResource;
  };
  range?: {
    normal: number;
    long?: number;
  };
  properties?: APIResource[];
  two_handed_damage?: {
    damage_dice: string;
    damage_type: APIResource;
  };
}
