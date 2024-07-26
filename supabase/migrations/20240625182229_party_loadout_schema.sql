create extension pg_jsonschema with schema extensions;

alter table public.party_loadouts
    add constraint loadout_schema_check check (
        jsonb_matches_schema(
                '{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "array",
    "minItems": 6,
    "maxItems": 6,
    "items": [
        {
            "type": "object",
            "required": [
                "classId",
                "backgroundId",
                "feats",
                "level",
                "portrait",
                "primaryAttributes",
                "skills",
                "category"
            ],
            "additionalProperties": false,
            "properties": {
                "category": {
                    "type": "string",
                    "enum": [
                        "main"
                    ]
                },
                "classId": {
                    "type": "string"
                },
                "backgroundId": {
                    "type": "string"
                },
                "feats": {
                    "type": "object",
                    "additionalProperties": false,
                    "patternProperties": {
                        "^FEA_.+$": {
                            "type": "number",
                            "minimum": 0,
                            "maximum": 6
                        }
                    }
                },
                "portrait": {
                    "type": "string"
                },
                "level": {
                    "type": "number",
                    "minimum": 1,
                    "maximum": 20
                },
                "primaryAttributes": {
                    "type": "object",
                    "additionalProperties": false,
                    "patternProperties": {
                        "^ATT_.+$": {
                            "type": "number",
                            "minimum": 0,
                            "maximum": 3
                        }
                    }
                },
                "skills": {
                    "type": "object",
                    "additionalProperties": false,
                    "patternProperties": {
                        "^ATT_.+$": {
                            "type": "number",
                            "minimum": 0,
                            "maximum": 4
                        }
                    }
                }
            }
        },
        {
            "oneOf": [
                {
                    "type": "object",
                    "required": [
                        "characterId",
                        "category",
                        "feats",
                        "level"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "characterId": {
                            "type": "string"
                        },
                        "category": {
                            "type": "string",
                            "enum": [
                                "story"
                            ]
                        },
                        "feats": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^FEA_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 6
                                }
                            }
                        },
                        "level": {
                            "type": "number",
                            "minimum": 1,
                            "maximum": 20
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "classId",
                        "backgroundId",
                        "feats",
                        "level",
                        "portrait",
                        "primaryAttributes",
                        "skills",
                        "category"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "category": {
                            "type": "string",
                            "enum": [
                                "mercenary"
                            ]
                        },
                        "classId": {
                            "type": "string"
                        },
                        "backgroundId": {
                            "type": "string"
                        },
                        "feats": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^FEA_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 6
                                }
                            }
                        },
                        "portrait": {
                            "type": "string"
                        },
                        "level": {
                            "type": "number",
                            "minimum": 1,
                            "maximum": 20
                        },
                        "primaryAttributes": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^ATT_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 3
                                }
                            }
                        },
                        "skills": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^ATT_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 4
                                }
                            }
                        }
                    }
                },
                {
                    "type": "null"
                }
            ]
        },
        {
            "oneOf": [
                {
                    "type": "object",
                    "required": [
                        "characterId",
                        "category",
                        "feats",
                        "level"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "characterId": {
                            "type": "string"
                        },
                        "category": {
                            "type": "string",
                            "enum": [
                                "story"
                            ]
                        },
                        "feats": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^FEA_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 6
                                }
                            }
                        },
                        "level": {
                            "type": "number",
                            "minimum": 1,
                            "maximum": 20
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "classId",
                        "backgroundId",
                        "feats",
                        "level",
                        "portrait",
                        "primaryAttributes",
                        "skills",
                        "category"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "category": {
                            "type": "string",
                            "enum": [
                                "mercenary"
                            ]
                        },
                        "classId": {
                            "type": "string"
                        },
                        "backgroundId": {
                            "type": "string"
                        },
                        "feats": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^FEA_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 6
                                }
                            }
                        },
                        "portrait": {
                            "type": "string"
                        },
                        "level": {
                            "type": "number",
                            "minimum": 1,
                            "maximum": 20
                        },
                        "primaryAttributes": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^ATT_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 3
                                }
                            }
                        },
                        "skills": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^ATT_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 4
                                }
                            }
                        }
                    }
                },
                {
                    "type": "null"
                }
            ]
        },
        {
            "oneOf": [
                {
                    "type": "object",
                    "required": [
                        "characterId",
                        "category",
                        "feats",
                        "level"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "characterId": {
                            "type": "string"
                        },
                        "category": {
                            "type": "string",
                            "enum": [
                                "story"
                            ]
                        },
                        "feats": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^FEA_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 6
                                }
                            }
                        },
                        "level": {
                            "type": "number",
                            "minimum": 1,
                            "maximum": 20
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "classId",
                        "backgroundId",
                        "feats",
                        "level",
                        "portrait",
                        "primaryAttributes",
                        "skills",
                        "category"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "category": {
                            "type": "string",
                            "enum": [
                                "mercenary"
                            ]
                        },
                        "classId": {
                            "type": "string"
                        },
                        "backgroundId": {
                            "type": "string"
                        },
                        "feats": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^FEA_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 6
                                }
                            }
                        },
                        "portrait": {
                            "type": "string"
                        },
                        "level": {
                            "type": "number",
                            "minimum": 1,
                            "maximum": 20
                        },
                        "primaryAttributes": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^ATT_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 3
                                }
                            }
                        },
                        "skills": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^ATT_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 4
                                }
                            }
                        }
                    }
                },
                {
                    "type": "null"
                }
            ]
        },
        {
            "oneOf": [
                {
                    "type": "object",
                    "required": [
                        "characterId",
                        "category",
                        "feats",
                        "level"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "characterId": {
                            "type": "string"
                        },
                        "category": {
                            "type": "string",
                            "enum": [
                                "story"
                            ]
                        },
                        "feats": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^FEA_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 6
                                }
                            }
                        },
                        "level": {
                            "type": "number",
                            "minimum": 1,
                            "maximum": 20
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "classId",
                        "backgroundId",
                        "feats",
                        "level",
                        "portrait",
                        "primaryAttributes",
                        "skills",
                        "category"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "category": {
                            "type": "string",
                            "enum": [
                                "mercenary"
                            ]
                        },
                        "classId": {
                            "type": "string"
                        },
                        "backgroundId": {
                            "type": "string"
                        },
                        "feats": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^FEA_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 6
                                }
                            }
                        },
                        "portrait": {
                            "type": "string"
                        },
                        "level": {
                            "type": "number",
                            "minimum": 1,
                            "maximum": 20
                        },
                        "primaryAttributes": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^ATT_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 3
                                }
                            }
                        },
                        "skills": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^ATT_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 4
                                }
                            }
                        }
                    }
                },
                {
                    "type": "null"
                }
            ]
        },
        {
            "oneOf": [
                {
                    "type": "object",
                    "required": [
                        "characterId",
                        "category",
                        "feats",
                        "level"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "characterId": {
                            "type": "string"
                        },
                        "category": {
                            "type": "string",
                            "enum": [
                                "story"
                            ]
                        },
                        "feats": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^FEA_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 6
                                }
                            }
                        },
                        "level": {
                            "type": "number",
                            "minimum": 1,
                            "maximum": 20
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "classId",
                        "backgroundId",
                        "feats",
                        "level",
                        "portrait",
                        "primaryAttributes",
                        "skills",
                        "category"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "category": {
                            "type": "string",
                            "enum": [
                                "mercenary"
                            ]
                        },
                        "classId": {
                            "type": "string"
                        },
                        "backgroundId": {
                            "type": "string"
                        },
                        "feats": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^FEA_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 6
                                }
                            }
                        },
                        "portrait": {
                            "type": "string"
                        },
                        "level": {
                            "type": "number",
                            "minimum": 1,
                            "maximum": 20
                        },
                        "primaryAttributes": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^ATT_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 3
                                }
                            }
                        },
                        "skills": {
                            "type": "object",
                            "additionalProperties": false,
                            "patternProperties": {
                                "^ATT_.+$": {
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 4
                                }
                            }
                        }
                    }
                },
                {
                    "type": "null"
                }
            ]
        }
    ]
}',
                loadout
        )
        );